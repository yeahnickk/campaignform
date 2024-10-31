import React, { useState } from 'react';

const NotificationPreview = () => {
  const [title, setTitle] = useState('Notification Title');
  const [message, setMessage] = useState('This is the notification message that will appear on your device.');
  const [currentTime, setCurrentTime] = useState('now');
  const appName = "Flybuys"; // Fixed app name

  const TITLE_LIMIT = 40;
  const IOS_MESSAGE_LIMIT = 110;
  const ANDROID_MESSAGE_LIMIT = 100;

  const [selectedName, setSelectedName] = useState(0);
  const [selectedPoints, setSelectedPoints] = useState(0);

  // Sample first names for preview
  const sampleNames = [
    'Nick', 'James', 'Emma', 'Sarah', 'Michael', 
    'Oliver', 'Charlotte', 'William', 'Sophie', 'Thomas',
    'Lucy', 'Henry', 'Alice', 'George', 'Elizabeth',
    'Jack', 'Emily', 'Charlie', 'Grace', 'Daniel',
    'Hannah', 'David', 'Sophie', 'Matthew', 'Isabella'
  ];
  const samplePoints = [
    100 + Math.floor(Math.random() * 899),                  // 3 digits (100-999)
    1000 + Math.floor(Math.random() * 8999),               // 4 digits (1000-9999)
    10000 + Math.floor(Math.random() * 89999),             // 5 digits (10000-99999)
    100000 + Math.floor(Math.random() * 899999),           // 6 digits (100000-999999)
  ];

  const formatPoints = (points: number) => {
    return points.toLocaleString();
  };

  // Function to replace personalization tokens with values
  const replacePersonalization = (text: string) => {
    return text
      .replace(/{FNAME}/g, sampleNames[selectedName])
      .replace(/{POINTS}/g, formatPoints(samplePoints[selectedPoints]));
  };

  // Function to cycle through names
  const cycleNextName = () => {
    setSelectedName((prev) => (prev + 1) % sampleNames.length);
  };

  // Function to cycle through points
  const cycleNextPoints = () => {
    setSelectedPoints((prev) => (prev + 1) % samplePoints.length);
  };

  // Function to insert personalization token at cursor position
  const insertPersonalization = (token: string) => {
    const textarea = document.getElementById(
      token === '{FNAME}' || token === '{POINTS}' ? 'notificationTitle' : 'notificationMessage'
    ) as HTMLInputElement | HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = token === '{FNAME}' || token === '{POINTS}' ? title : message;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    if (token === '{FNAME}' || token === '{POINTS}') {
      setTitle(`${before}${token}${after}`);
    } else {
      setMessage(`${before}${token}${after}`);
    }
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value.slice(0, TITLE_LIMIT);
    setTitle(newTitle);
  };

  const handleMessageChange = (e) => {
    const newMessage = e.target.value.slice(0, Math.max(IOS_MESSAGE_LIMIT, ANDROID_MESSAGE_LIMIT));
    setMessage(newMessage);
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}...`;
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Notification Preview</h2>
        
        {/* Personalization Toolbar */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Personalization</h3>
            <div className="flex gap-2">
              <button
                onClick={() => insertPersonalization('{FNAME}')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                First Name
              </button>
              <button
                onClick={() => insertPersonalization('{POINTS}')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Points
              </button>
            </div>
            <div className="space-y-2">
              {(title.includes('{FNAME}') || message.includes('{FNAME}')) && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="text-gray-600">Preview name:</span>
                  <span className="font-medium">{sampleNames[selectedName]}</span>
                  <button
                    onClick={cycleNextName}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Try next name
                  </button>
                </div>
              )}
              {(title.includes('{POINTS}') || message.includes('{POINTS}')) && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="text-gray-600">Preview points:</span>
                  <span className="font-medium">{formatPoints(samplePoints[selectedPoints])}</span>
                  <button
                    onClick={cycleNextPoints}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Try next amount
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (max {TITLE_LIMIT} characters)</label>
            <div className="mt-1 relative">
              <input
                id="notificationTitle"
                type="text"
                value={title}
                onChange={handleTitleChange}
                maxLength={TITLE_LIMIT}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
                placeholder="Enter notification title"
              />
              <span className={`absolute right-2 bottom-2 text-xs ${
                title.length === TITLE_LIMIT ? 'text-red-500' : 'text-gray-400'
              }`}>
                {title.length}/{TITLE_LIMIT}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message 
              <span className="text-xs text-gray-500 ml-2">
                (iOS: {IOS_MESSAGE_LIMIT} chars, Android: {ANDROID_MESSAGE_LIMIT} chars visible)
              </span>
            </label>
            <div className="mt-1 relative">
              <textarea
                id="notificationMessage"
                value={message}
                onChange={handleMessageChange}
                maxLength={Math.max(IOS_MESSAGE_LIMIT, ANDROID_MESSAGE_LIMIT)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-16 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
                placeholder="Enter notification message"
                rows={3}
              />
              <span className={`absolute right-2 bottom-2 text-xs ${
                message.length >= Math.min(IOS_MESSAGE_LIMIT, ANDROID_MESSAGE_LIMIT) ? 'text-red-500' : 'text-gray-400'
              }`}>
                {message.length}/{Math.max(IOS_MESSAGE_LIMIT, ANDROID_MESSAGE_LIMIT)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Preview */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 mb-3">iOS Preview:</h3>
        <div className="bg-white rounded-2xl shadow-lg p-4 max-w-sm">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden">
              <img 
                src="https://i.imgur.com/sTqZuwv.png" 
                alt="Flybuys icon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-sm">{appName}</span>
                <span className="text-xs text-gray-500">{currentTime}</span>
              </div>
              <h4 className="font-bold text-sm mt-1">{truncateText(replacePersonalization(title), TITLE_LIMIT)}</h4>
              <p className="text-sm text-gray-600 mt-1">{truncateText(replacePersonalization(message), IOS_MESSAGE_LIMIT)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Samsung Galaxy Preview */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Samsung Galaxy Preview:</h3>
        <div className="bg-gray-100/80 backdrop-blur p-3 space-y-2 max-w-sm">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 pt-2 pb-1 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://i.imgur.com/sTqZuwv.png" 
                  alt="Flybuys icon"
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex space-x-1 items-center">
                  <span className="text-sm font-medium text-gray-900">{appName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{currentTime}</span>
                </div>
              </div>
              <div className="w-1 h-4 flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="px-4 pb-3">
              <h4 className="text-sm font-medium text-gray-900">{truncateText(replacePersonalization(title), TITLE_LIMIT)}</h4>
              <p className="text-sm text-gray-600 mt-0.5">{truncateText(replacePersonalization(message), ANDROID_MESSAGE_LIMIT)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreview;