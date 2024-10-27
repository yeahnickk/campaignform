/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Clock, FileText, Download, Bold, Italic, List, ChevronRight, Home } from "lucide-react";

// Basic HTML Editor Component
const BasicHtmlEditor = ({ value, onChange }) => {
  const insertTag = (tag) => {
    const textarea = document.getElementById('bodyCopyEditor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    
    let newText;
    if (tag === 'ul') {
      const listItems = selection ? selection.split('\n').map(item => `  <li>${item}</li>`).join('\n') : '  <li></li>';
      newText = `${before}<ul>\n${listItems}\n</ul>${after}`;
    } else {
      newText = `${before}<${tag}>${selection}</${tag}>${after}`;
    }
    
    onChange(newText);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => insertTag('strong')}
          className="p-2 border rounded hover:bg-gray-100"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('em')}
          className="p-2 border rounded hover:bg-gray-100"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('ul')}
          className="p-2 border rounded hover:bg-gray-100"
        >
          <List className="h-4 w-4" />
        </button>
      </div>
      <textarea
        id="bodyCopyEditor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[200px] p-2 border rounded font-mono text-sm"
        placeholder="Enter your content here... Use the buttons above to add HTML formatting."
      />
    </div>
  );
};

const HomePage = ({ onSelectForm, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Layout currentPage="Home" onNavigate={() => {}}>
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Campaign Form Generator</h1>
            <p className="text-lg text-gray-600">Select the type of form you want to generate or search for an existing campaign</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="bg-white p-6 space-y-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectForm('edm')}
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">EDM</h2>
                <p className="text-sm text-gray-600 mt-2">Generate email templates for your EDM campaigns</p>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-sm font-medium">Get started</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 space-y-4 rounded-lg shadow opacity-75">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">WOT</h2>
                <p className="text-sm text-gray-600 mt-2">Coming soon: Generate WOT documentation</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-sm font-medium">Coming soon</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 space-y-4 rounded-lg shadow opacity-75">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Other</h2>
                <p className="text-sm text-gray-600 mt-2">Coming soon: Additional form types</p>
              </div>
              <div className="flex items-center text-purple-600">
                <span className="text-sm font-medium">Coming soon</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Campaign ID"
                className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PartnerSelection = ({ onSelectPartner, onNavigate }) => {
  const partners = ['Coles', 'Kmart', 'Target'];

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
    setFormData({ cmPartner: partner }); // Initialize formData
    setCurrentPage('template');
  };

  return (
    <Layout currentPage="Select Partner" onNavigate={onNavigate}>
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Select Partner</h1>
          <p className="text-lg text-gray-600">Choose the partner you&apos;re building the campaign for</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner}
              className="bg-white p-6 space-y-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectPartner(partner)}
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{partner}</h2>
                <p className="text-sm text-gray-600 mt-2">Select to create a campaign for {partner}</p>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-sm font-medium">Choose</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const TemplateSelection = ({ partner, onSelectTemplate, onNavigate }) => {
  const templates = partner === 'Coles' 
    ? [
        { id: 1, name: 'Standard Marketing Campaign' },
        { id: 2, name: 'Transactional Campaign' },
        { id: 3, name: 'Solus Campaign' },
        { id: 4, name: 'CEDM Campaign' },
        { id: 5, name: 'API Triggered Communication' }
      ]
    : [1, 2, 3, 4, 5].map(id => ({ id, name: `Template ${id}` }));

  return (
    <Layout currentPage="Select Template" partner={partner} onNavigate={onNavigate}>
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Select Template for {partner}</h1>
          <p className="text-lg text-gray-600">Choose the template you want to use</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="bg-white p-6 space-y-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{template.name}</h2>
                <p className="text-sm text-gray-600 mt-2">Click to use this template</p>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="text-sm font-medium">Use Template</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Breadcrumbs = ({ currentPage, partner, template, onNavigate }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href="#" onClick={() => onNavigate('home')} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
            <Home className="w-4 h-4 mr-2" />
            Home
          </a>
        </li>
        {partner && (
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <a href="#" onClick={() => onNavigate('partner')} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">{partner}</a>
            </div>
          </li>
        )}
        {template && (
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <a href="#" onClick={() => onNavigate('template')} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Select Template</a>
            </div>
          </li>
        )}
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{currentPage}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

const DataTeamView = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          value={formData.targetAudience || ''}
          onChange={(e) => handleInputChange('targetAudience', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="e.g., Flybuys members aged 25-45"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Segment Criteria</label>
        <textarea
          value={formData.segmentCriteria || ''}
          onChange={(e) => handleInputChange('segmentCriteria', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="4"
          placeholder="Describe the criteria for segmenting the audience"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Exclusions</label>
        <textarea
          value={formData.exclusions || ''}
          onChange={(e) => handleInputChange('exclusions', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="4"
          placeholder="List any exclusions from the target audience"
        />
      </div>
    </div>
  );
};

const IframeEmailPreview = ({ formData, partner, template }) => {
  const iframeContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word">
    <head>
    <title>Flybuys</title>
    <!-- DEFAULT META TAGS -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
      /* ... (include all the styles from the provided HTML) ... */
    </style>
    </head>
    <body bgcolor="#ffffff" class="u-noPadding">
      <!-- ... (include all the body content from the provided HTML) ... -->
    </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={iframeContent}
      title="Email Preview"
      className="w-full h-full border-0"
      sandbox="allow-scripts"
    />
  );
};

const FormApp = ({ onNavigate, partner, template, onSave, loadedCampaign }) => {
  const [activeView, setActiveView] = useState(loadedCampaign ? 'form' : 'campaignId');
  const [formData, setFormData] = useState(loadedCampaign || { 
    cmPartner: partner, 
    templateId: template.id, 
    templateName: template.name,
    offerCount: 0 // Initialize offerCount for all partners
  });
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    const campaignData = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`campaign_${formData.campaignId}`, JSON.stringify(campaignData));
    onSave(campaignData);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleCampaignIdSubmit = (e) => {
    e.preventDefault();
    if (validateCampaignId(formData.campaignId)) {
      // Check if a campaign with this ID already exists
      const existingCampaign = localStorage.getItem(`campaign_${formData.campaignId}`);
      if (existingCampaign) {
        // If it exists, load the existing data
        const parsedCampaign = JSON.parse(existingCampaign);
        setFormData(parsedCampaign);
        setShowSaveNotification(true);
        setTimeout(() => setShowSaveNotification(false), 3000);
      } else {
        // If it's new, create a new entry
        const initialCampaign = {
          ...formData,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(`campaign_${formData.campaignId}`, JSON.stringify(initialCampaign));
      }
      setActiveView('form');
    } else {
      alert('Please enter a valid Campaign ID');
    }
  };

  if (activeView === 'campaignId') {
    return (
      <Layout currentPage="Enter Campaign ID" partner={partner} template={template.name} onNavigate={onNavigate}>
        <div className="max-w-md mx-auto mt-10">
          <form onSubmit={handleCampaignIdSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campaignId">
                Campaign ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="campaignId"
                type="text"
                placeholder="Enter Campaign ID"
                value={formData.campaignId || ''}
                onChange={(e) => handleInputChange('campaignId', e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="Campaign Brief" partner={partner} template={template.name} onNavigate={onNavigate}>
      <div className="max-w-[1920px] w-full mx-auto space-y-8">
        {/* Header section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Brief</h1>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg text-gray-600">Campaign ID: <span className="font-semibold">{formData.campaignId}</span></p>
              <p className="text-lg text-gray-600">Template: <span className="font-semibold">{template.name}</span></p>
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Campaign
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveView('form')}
            className={`px-4 py-2 rounded-md ${activeView === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Form & Preview
          </button>
          <button
            onClick={() => setActiveView('data')}
            className={`px-4 py-2 rounded-md ${activeView === 'data' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Data Team
          </button>
          <button
            onClick={() => setActiveView('offers')}
            className={`px-4 py-2 rounded-md ${activeView === 'offers' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Offers
          </button>
        </div>

        {activeView === 'form' && (
          <FormView 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        )}
        {activeView === 'data' && (
          <DataTeamView formData={formData} handleInputChange={handleInputChange} />
        )}
        {activeView === 'offers' && (
          <OffersView formData={formData} handleInputChange={handleInputChange} />
        )}
      </div>
      {showSaveNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg save-notification">
          Campaign saved successfully!
        </div>
      )}
    </Layout>
  );
};

const SearchResults = ({ searchQuery, onLoadCampaign, onBack }) => {
  const [results, setResults] = useState([]);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);

  useEffect(() => {
    const fetchCampaigns = () => {
      const campaigns = Object.keys(localStorage)
        .filter(key => key.startsWith('campaign_') && key.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(key => {
          const campaign = JSON.parse(localStorage.getItem(key));
          return { id: key.replace('campaign_', ''), ...campaign };
        });
      setResults(campaigns);
    };

    fetchCampaigns();
  }, [searchQuery]);

  const handleDelete = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      localStorage.removeItem(`campaign_${campaignId}`);
      setResults(prevResults => prevResults.filter(campaign => campaign.id !== campaignId));
      setShowDeleteNotification(true);
      setTimeout(() => setShowDeleteNotification(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <Breadcrumbs currentPage="Search Results" onNavigate={onBack} />
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
        {results.length === 0 ? (
          <p>No results found for "{searchQuery}"</p>
        ) : (
          <ul className="space-y-4">
            {results.map(campaign => (
              <li key={campaign.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{campaign.campaignId}</h2>
                    <p className="text-gray-600">{campaign.cmPartner} - {campaign.templateName}</p>
                    <p className="text-gray-600">Subject: {campaign.subjectLine || 'N/A'}</p>
                    <p className="text-gray-600">Last Updated: {new Date(campaign.lastUpdated).toLocaleString()}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => onLoadCampaign(campaign)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showDeleteNotification && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg save-notification">
          Campaign deleted successfully!
        </div>
      )}
    </div>
  );
};

const validateCampaignId = (id) => {
  // Add your validation logic here
  // For example, ensure it's not empty and follows a specific format
  return id.trim() !== '' && /^[A-Za-z0-9-_]+$/.test(id);
};

const Layout = ({ children, currentPage, partner, template, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-[1920px] w-full mx-auto p-8 flex flex-col flex-grow">
        <Breadcrumbs 
          currentPage={currentPage} 
          partner={partner} 
          template={template} 
          onNavigate={onNavigate} 
        />
        <div className="mt-8 flex-grow flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

const OffersView = ({ formData, handleInputChange }) => {
  const offerCount = formData.offerCount || 0;

  const renderOfferFields = (index) => (
    <div key={index} className="border p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Offer {index + 1}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer Spend</label>
          <input
            type="text"
            value={formData[`offerSpend${index}`] || ''}
            onChange={(e) => handleInputChange(`offerSpend${index}`, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer Get</label>
          <input
            type="text"
            value={formData[`offerGet${index}`] || ''}
            onChange={(e) => handleInputChange(`offerGet${index}`, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer Title</label>
          <input
            type="text"
            value={formData[`offerTitle${index}`] || ''}
            onChange={(e) => handleInputChange(`offerTitle${index}`, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer Start Date</label>
          <input
            type="date"
            value={formData[`offerStartDate${index}`] || ''}
            onChange={(e) => handleInputChange(`offerStartDate${index}`, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer End Date</label>
          <input
            type="date"
            value={formData[`offerEndDate${index}`] || ''}
            onChange={(e) => handleInputChange(`offerEndDate${index}`, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">How many offers?</label>
        <select
          value={offerCount}
          onChange={(e) => handleInputChange('offerCount', parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {[...Array(11).keys()].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      {[...Array(offerCount).keys()].map(renderOfferFields)}
    </div>
  );
};

const FormView = ({ formData, handleInputChange }) => {
  const renderEmailPreview = () => {
    const emailHTML = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>${formData.subjectLine || 'Email Preview'}</title>
          <style media="all" type="text/css">
            /* -------------------------------------
            GLOBAL RESETS
            ------------------------------------- */
            
            body {
              font-family: Helvetica, sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 16px;
              line-height: 1.3;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
            
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
            }
            
            table td {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              vertical-align: top;
            }
            /* -------------------------------------
            BODY & CONTAINER
            ------------------------------------- */
            
            body {
              background-color: #f4f5f6;
              margin: 0;
              padding: 0;
            }
            
            .body {
              background-color: #f4f5f6;
              width: 100%;
            }
            
            .container {
              margin: 0 auto !important;
              max-width: 600px;
              padding: 0;
              padding-top: 24px;
              width: 600px;
            }
            
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 600px;
              padding: 0;
            }
            /* -------------------------------------
            HEADER, FOOTER, MAIN
            ------------------------------------- */
            
            .main {
              background: #ffffff;
              border: 1px solid #eaebed;
              border-radius: 16px;
              width: 100%;
            }
            
            .wrapper {
              box-sizing: border-box;
              padding: 24px;
            }
            
            .footer {
              clear: both;
              padding-top: 24px;
              text-align: center;
              width: 100%;
            }
            
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #9a9ea6;
              font-size: 16px;
              text-align: center;
            }
            /* -------------------------------------
            TYPOGRAPHY
            ------------------------------------- */
            
            p {
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 16px;
            }
            
            a {
              color: #0867ec;
              text-decoration: underline;
            }
            /* -------------------------------------
            BUTTONS
            ------------------------------------- */
            
            .btn {
              box-sizing: border-box;
              min-width: 100% !important;
              width: 100%;
            }
            
            .btn > tbody > tr > td {
              padding-bottom: 16px;
            }
            
            .btn table {
              width: auto;
            }
            
            .btn table td {
              background-color: #ffffff;
              border-radius: 4px;
              text-align: center;
            }
            
            .btn a {
              background-color: #ffffff;
              border: solid 2px #0867ec;
              border-radius: 4px;
              box-sizing: border-box;
              color: #0867ec;
              cursor: pointer;
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              margin: 0;
              padding: 12px 24px;
              text-decoration: none;
              text-transform: capitalize;
            }
            
            .btn-primary table td {
              background-color: #0867ec;
            }
            
            .btn-primary a {
              background-color: #0867ec;
              border-color: #0867ec;
              color: #ffffff;
            }
            
            @media all {
              .btn-primary table td:hover {
                background-color: #ec0867 !important;
              }
              .btn-primary a:hover {
                background-color: #ec0867 !important;
                border-color: #ec0867 !important;
              }
            }
            
            /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
            
            .last {
              margin-bottom: 0;
            }
            
            .first {
              margin-top: 0;
            }
            
            .align-center {
              text-align: center;
            }
            
            .align-right {
              text-align: right;
            }
            
            .align-left {
              text-align: left;
            }
            
            .text-link {
              color: #0867ec !important;
              text-decoration: underline !important;
            }
            
            .clear {
              clear: both;
            }
            
            .mt0 {
              margin-top: 0;
            }
            
            .mb0 {
              margin-bottom: 0;
            }
            
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
            }
            
            .powered-by a {
              text-decoration: none;
            }
            
            /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            
            @media only screen and (max-width: 640px) {
              .main p,
              .main td,
              .main span {
                font-size: 16px !important;
              }
              .wrapper {
                padding: 8px !important;
              }
              .content {
                padding: 0 !important;
              }
              .container {
                padding: 0 !important;
                padding-top: 8px !important;
                width: 100% !important;
              }
              .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
              }
              .btn table {
                max-width: 100% !important;
                width: 100% !important;
              }
              .btn a {
                font-size: 16px !important;
                max-width: 100% !important;
                width: 100% !important;
              }
            }
            /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            
            @media all {
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
            }
          </style>
        </head>
        <body>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
                  <div style="background-color: #f3f3f3; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                    <strong>Subject:</strong> ${formData.subjectLine || 'No subject'}
                  </div>
                  <span class="preheader">${formData.previewText || 'This is preheader text. Some clients will show this text as a preview.'}</span>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                    <tr>
                      <td class="wrapper">
                        ${formData.emailContent || `
                          <p>Hi there</p>
                          <p>Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td> <a href="http://htmlemail.io" target="_blank">Call To Action</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p>This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p>
                          <p>Good luck! Hope it works.</p>
                        `}
                      </td>
                    </tr>
                  </table>
                  <div class="footer">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="content-block">
                          <span class="apple-link">${formData.companyAddress || 'Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB'}</span>
                          <br> Don't like these emails? <a href="http://htmlemail.io/blog">Unsubscribe</a>.
                        </td>
                      </tr>
                      <tr>
                        <td class="content-block powered-by">
                          Powered by <a href="http://htmlemail.io">HTMLemail.io</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    return (
      <iframe
        srcDoc={emailHTML}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="Email Preview"
      />
    );
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign ID</label>
              <input
                type="text"
                value={formData.campaignId || ''}
                onChange={(e) => handleInputChange('campaignId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
              <input
                type="text"
                value={formData.campaignName || ''}
                onChange={(e) => handleInputChange('campaignName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preview Text</label>
              <input
                type="text"
                value={formData.previewText || ''}
                onChange={(e) => handleInputChange('previewText', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Content</label>
              <textarea
                value={formData.emailContent || ''}
                onChange={(e) => handleInputChange('emailContent', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Line</label>
              <input
                type="text"
                value={formData.subjectLine || ''}
                onChange={(e) => handleInputChange('subjectLine', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            {/* Add more form fields as needed */}
          </div>
          {/* The "Save Campaign" button has been removed from here */}
        </div>
      </div>
      <div className="col-span-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Email Preview</h2>
          {renderEmailPreview()}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedCampaign, setLoadedCampaign] = useState(null);
  const [formData, setFormData] = useState({ cmPartner: '' });

  const handleSelectForm = (formType) => {
    if (formType === 'edm') {
      setCurrentPage('partner');
    }
  };

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
    setFormData({ cmPartner: partner }); // Initialize formData
    setCurrentPage('template');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate({
      id: template.id,
      name: template.name
    });
    setCurrentPage('form');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedPartner(null);
      setSelectedTemplate(null);
    } else if (page === 'partner') {
      setSelectedTemplate(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleLoadCampaign = (campaign) => {
    setLoadedCampaign(campaign);
    setSelectedPartner(campaign.cmPartner);
    setSelectedTemplate({ id: campaign.templateId, name: campaign.templateName });
    setCurrentPage('form');
  };

  const handleSaveCampaign = (campaign) => {
    // This function is now handled within the FormApp component
    console.log('Campaign saved:', campaign);
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onSelectForm={handleSelectForm} onSearch={handleSearch} />
      )}
      {currentPage === 'search' && (
        <SearchResults
          searchQuery={searchQuery}
          onLoadCampaign={handleLoadCampaign}
          onBack={() => handleNavigate('home')}
        />
      )}
      {currentPage === 'partner' && (
        <PartnerSelection onSelectPartner={handleSelectPartner} onNavigate={handleNavigate} />
      )}
      {currentPage === 'template' && (
        <TemplateSelection 
          partner={selectedPartner} 
          onSelectTemplate={handleSelectTemplate} 
          onNavigate={handleNavigate} 
        />
      )}
      {currentPage === 'form' && (
        <FormApp 
          onNavigate={handleNavigate} 
          partner={selectedPartner} 
          template={selectedTemplate}
          onSave={handleSaveCampaign}
          loadedCampaign={loadedCampaign}
        />
      )}
    </>
  );
};

export default App;
