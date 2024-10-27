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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
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
---testignore---
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
  );
};

const PartnerSelection = ({ onSelectPartner, onNavigate }) => {
  const partners = ['Coles', 'Kmart', 'Target'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <Breadcrumbs currentPage="Select Partner" onNavigate={onNavigate} />
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Select Partner</h1>
          <p className="text-lg text-gray-600">Choose the partner you're building the campaign for</p>
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
    </div>
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
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <Breadcrumbs currentPage="Select Template" partner={partner} onNavigate={onNavigate} />
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
              onClick={() => onSelectTemplate(template.id)}
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
    </div>
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
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{currentPage}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

const FormApp = ({ onNavigate, partner, template, onSave, loadedCampaign }) => {
  const [formData, setFormData] = useState({
    campaignId: '',
    cmDate: '',
    cmPartner: partner || '',
    lmsName: '',
    dcsName: '',
    bodyCopy: '',
    subjectLine: ''
  });

  const [activeTab, setActiveTab] = useState('cm'); // Add this line

  useEffect(() => {
    if (loadedCampaign) {
      setFormData(loadedCampaign);
    }
  }, [loadedCampaign]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Field', 'Value'],
      ['Campaign Manager', formData.campaignId],
      ['Date', formData.cmDate],
      ['Partner', formData.cmPartner],
      ['LMS Contact', formData.lmsName],
      ['DCS Contact', formData.dcsName],
      ['Body Copy', formData.bodyCopy]
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `campaign_brief_${formData.cmDate || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleSave = () => {
    // Generate a unique key using the campaignId
    const key = `campaign_${formData.campaignId}`;
    // Save the formData to localStorage
    localStorage.setItem(key, JSON.stringify(formData));
    // Call the onSave prop to notify the parent component
    onSave(formData);
  };

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const renderEmailPreview = () => {
    let templateContent = '';
    
    if (partner === 'Coles') {
      switch (template) {
        case 1:
          templateContent = `
            <h2>Standard Marketing Campaign</h2>
            <p>This is a preview of a standard marketing campaign for Coles.</p>
          `;
          break;
        case 2:
          templateContent = `
            <h2>Transactional Campaign</h2>
            <p>This is a preview of a transactional campaign for Coles.</p>
          `;
          break;
        case 3:
          templateContent = `
            <h2>Solus Campaign</h2>
            <p>This is a preview of a solus campaign for Coles.</p>
          `;
          break;
        case 4:
          templateContent = `
            <h2>CEDM Campaign</h2>
            <p>This is a preview of a CEDM campaign for Coles.</p>
          `;
          break;
        case 5:
          templateContent = `
            <h2>API Triggered Communication</h2>
            <p>This is a preview of an API triggered communication for Coles.</p>
          `;
          break;
        default:
          templateContent = `
            <h2>Default Campaign</h2>
            <p>Please select a valid template.</p>
          `;
      }
    } else {
      templateContent = `
        <h2>Default Campaign</h2>
        <p>This is a default campaign preview for ${escapeHtml(partner || '[Partner]')}.</p>
      `;
    }

    return (
      <div className="flex-1 bg-white p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">From: flybuys@edm.flybuys.com.au</p>
          <p className="text-sm font-semibold">Subject: {escapeHtml(formData.subjectLine || 'Campaign Brief - [Subject]')}</p>
        </div>
        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            Dear {escapeHtml(formData.cmPartner || '[Partner]')} team,
          </div>
          
          <div className="text-sm text-gray-600">
            I hope this email finds you well. Please find below the campaign brief details for our upcoming collaboration:
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Campaign Details</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Campaign ID: {escapeHtml(formData.campaignId || '[Campaign ID]')}</p>
              <p className="text-sm text-gray-600">Partner: {escapeHtml(formData.cmPartner || '[Partner]')}</p>
              <p className="text-sm text-gray-600">Date: {escapeHtml(formData.cmDate || '[Date]')}</p>
              {formData.lmsName && <p className="text-sm text-gray-600">LMS Contact: {escapeHtml(formData.lmsName)}</p>}
              {formData.dcsName && <p className="text-sm text-gray-600">DCS Contact: {escapeHtml(formData.dcsName)}</p>}
            </div>
          </div>
          
          <div 
            className="text-sm text-gray-600 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: templateContent }}
          />
          
          <div 
            className="text-sm text-gray-600 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: formData.bodyCopy }}
          />
          
          <div className="text-sm text-gray-600">
            Please review the details above and let me know if you have any questions or need any clarification.
          </div>
          
          <div className="text-sm text-gray-600">
            Best regards,<br />
            Campaign Manager
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <div className="max-w-[1920px] mx-auto p-8 space-y-8">
        <div>
          <Breadcrumbs currentPage="Campaign Brief" partner={partner} template={template} onNavigate={onNavigate} />
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Brief - {formData.cmPartner} 
            {partner === 'Coles' && ` - ${
              template === 1 ? 'Standard Marketing Campaign' :
              template === 2 ? 'Transactional Campaign' :
              template === 3 ? 'Solus Campaign' :
              template === 4 ? 'CEDM Campaign' :
              template === 5 ? 'API Triggered Communication' :
              'Unknown Template'
            }`}
          </h1>
          <div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
            >
              Export
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-md ${activeTab === 'cm' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('cm')}
                >
                  CM
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${activeTab === 'dcs' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('dcs')}
                >
                  DCS
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${activeTab === 'lms' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveTab('lms')}
                >
                  LMS
                </button>
              </div>

              {activeTab === 'cm' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What is the Campaign ID?</label>
                    <input
                      type="text"
                      value={formData.campaignId}
                      onChange={(e) => handleInputChange('campaignId', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What is the date today?</label>
                    <input
                      type="date"
                      value={formData.cmDate}
                      onChange={(e) => handleInputChange('cmDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                    <input
                      type="text"
                      value={formData.subjectLine}
                      onChange={(e) => handleInputChange('subjectLine', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body Copy</label>
                    <BasicHtmlEditor
                      value={formData.bodyCopy}
                      onChange={(value) => handleInputChange('bodyCopy', value)}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'dcs' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">DCS Name</label>
                  <input
                    type="text"
                    value={formData.dcsName}
                    onChange={(e) => handleInputChange('dcsName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              )}

              {activeTab === 'lms' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">LMS Name</label>
                  <input
                    type="text"
                    value={formData.lmsName}
                    onChange={(e) => handleInputChange('lmsName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-span-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Email Preview</h2>
            <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] overflow-auto">
              {renderEmailPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ searchQuery, onLoadCampaign, onBack }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Search for campaigns in localStorage
    const campaigns = Object.keys(localStorage)
      .filter(key => key.startsWith('campaign_') && key.includes(searchQuery))
      .map(key => {
        const campaign = JSON.parse(localStorage.getItem(key));
        return { id: key.replace('campaign_', ''), ...campaign };
      });
    setResults(campaigns);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
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
                    <p className="text-gray-600">{campaign.cmPartner} - {campaign.cmDate}</p>
                    <p className="text-gray-600">Subject: {campaign.subjectLine}</p>
                    <p className="text-gray-600">LMS: {campaign.lmsName}, DCS: {campaign.dcsName}</p>
                  </div>
                  <button
                    onClick={() => onLoadCampaign(campaign)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Load
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
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

  const handleSelectForm = (formType) => {
    if (formType === 'edm') {
      setCurrentPage('partner');
    }
  };

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
    setCurrentPage('template');
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentPage('form');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'home') {
      setSelectedPartner(null);
      setSelectedTemplate(null);
    } else if (page === 'partner') {
      setSelectedTemplate(null);
    } else if (page === 'template') {
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
    setSelectedTemplate(1); // Assuming a default template
    setCurrentPage('form');
  };

  const handleSaveCampaign = (campaign) => {
    // You can add additional logic here if needed
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
          onBack={() => setCurrentPage('home')}
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
