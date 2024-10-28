/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Clock, FileText, Download, Bold, Italic, List, ChevronRight, Home, ArrowUp } from "lucide-react";

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end);
      
      // Insert <br /> tag at cursor position
      const newText = `${before}<br />\n${after}`;
      onChange(newText);
      
      // Move cursor after the <br /> tag
      setTimeout(() => {
        textarea.selectionStart = start + 7; // length of "<br />\n"
        textarea.selectionEnd = start + 7;
      }, 0);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => insertTag('strong')}
          className="p-2 border rounded hover:bg-gray-100"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('em')}
          className="p-2 border rounded hover:bg-gray-100"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('ul')}
          className="p-2 border rounded hover:bg-gray-100"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('sup')}
          className="p-2 border rounded hover:bg-gray-100"
          title="Superscript"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <textarea
        id="bodyCopyEditor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[200px] p-2 border rounded font-mono text-sm"
        placeholder="Enter your content here... Use the buttons above to add HTML formatting. Press Enter for new lines."
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
        { id: 'COLES_STD_MKT_01', name: 'Standard Marketing Campaign' },
        { id: 'COLES_TRANS_01', name: 'Transactional Campaign' },
        { id: 'COLES_SOLUS_01', name: 'Solus Campaign' },
        { id: 'COLES_CEDM_01', name: 'CEDM Campaign' },
        { id: 'COLES_API_01', name: 'API Triggered Communication' }
      ]
    : partner === 'Kmart'
    ? [
        { id: 'KMART_STD_01', name: 'Template 1' },
        { id: 'KMART_STD_02', name: 'Template 2' },
        { id: 'KMART_STD_03', name: 'Template 3' },
        { id: 'KMART_STD_04', name: 'Template 4' },
        { id: 'KMART_STD_05', name: 'Template 5' }
      ]
    : [
        { id: 'TARGET_STD_01', name: 'Template 1' },
        { id: 'TARGET_STD_02', name: 'Template 2' },
        { id: 'TARGET_STD_03', name: 'Template 3' },
        { id: 'TARGET_STD_04', name: 'Template 4' },
        { id: 'TARGET_STD_05', name: 'Template 5' }
      ];

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
  const [iframeContent, setIframeContent] = useState('');
  const [iframeHeight, setIframeHeight] = useState('800px');
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadTemplate = async () => {
      if (template?.id === 'COLES_STD_MKT_01') {
        try {
          const response = await fetch('/templates/email_preview.html');
          const html = await response.text();
          
          // Replace all placeholders
          let processedHtml = html
            .replace('$HEADER$', formData?.header || '')
            .replace('$HERO_IMAGE$', formData?.heroImage || '')
            .replace('$EMAIL_CONTENT$', formData?.emailContent || '')
            .replace('$MAINCTATEXT$', formData?.ctaText || '');

          // Replace offer placeholders
          processedHtml = processedHtml
            .replace('$OFFERSPEND$', formData?.[`offerSpend${selectedOfferIndex}`] || '')
            .replace('$OFFERGET$', formData?.[`offerGet${selectedOfferIndex}`] || '')
            .replace('$OFFERTITLE$', formData?.[`offerTitle${selectedOfferIndex}`] || '')
            .replace('$OFFERSTARTDATE$', formData?.[`offerStartDate${selectedOfferIndex}`] || '')
            .replace('$OFFERENDDATE$', formData?.[`offerEndDate${selectedOfferIndex}`] || '');
          
          setIframeContent(processedHtml);
        } catch (error) {
          console.error('Error loading template:', error);
        }
      }
    };

    loadTemplate();

    // Separate useEffect for height adjustment
    const adjustHeight = () => {
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        try {
          const height = iframe.contentWindow.document.documentElement.scrollHeight;
          setIframeHeight(`${height}px`);
        } catch (error) {
          console.log('Setting default height due to security restriction');
          setIframeHeight('800px');
        }
      }
    };

    const timer = setTimeout(adjustHeight, 100);
    return () => clearTimeout(timer);
  }, [template?.id, formData, selectedOfferIndex]);

  // Generate offer selector options based on offerCount
  const offerCount = formData?.offerCount || 0;
  const offerOptions = Array.from({ length: offerCount }, (_, index) => index + 1);

  return (
    <div className="space-y-4">
      {/* Subject Line and Offer Selector Preview */}
      <div className="bg-gray-100 p-4 rounded-lg space-y-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Subject Line Preview:</div>
          <div className="font-medium">
            {formData?.subjectLine || 'No subject line entered'}
          </div>
        </div>
        
        {offerCount > 0 && (
          <div>
            <div className="text-sm text-gray-500 mb-1">Select Offer to Preview:</div>
            <select
              value={selectedOfferIndex}
              onChange={(e) => setSelectedOfferIndex(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {offerOptions.map((num) => (
                <option key={num - 1} value={num - 1}>
                  Offer {num}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Email Preview Iframe */}
      <div className="relative">
        <iframe
          ref={iframeRef}
          srcDoc={iframeContent}
          title="Email Preview"
          className="w-full border-0"
          style={{ height: iframeHeight }}
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
        />
      </div>
    </div>
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
        
        {/* Add this at the bottom of the component, just before the closing div */}
        <div className="fixed bottom-2 right-4 text-gray-300 text-xs">
          Template ID: {template.id}
        </div>
        
        {showSaveNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg save-notification">
            Campaign saved successfully!
          </div>
        )}
      </div>
    </Layout>
  );
};

const SearchResults = ({ searchQuery, onLoadCampaign, onBack }) => {
  const [results, setResults] = useState([]);
  const [showDeleteNotification, setShowDeleteNotification] = useState(false);
  const [showDeleteAllNotification, setShowDeleteAllNotification] = useState(false);

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

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to delete ALL campaigns? This action cannot be undone.')) {
      // Get all keys that start with 'campaign_'
      const campaignKeys = Object.keys(localStorage)
        .filter(key => key.startsWith('campaign_'));
      
      // Remove all campaigns
      campaignKeys.forEach(key => localStorage.removeItem(key));
      
      // Update results
      setResults([]);
      
      // Show notification
      setShowDeleteAllNotification(true);
      setTimeout(() => setShowDeleteAllNotification(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <Breadcrumbs currentPage="Search Results" onNavigate={onBack} />
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
          <div className="space-x-4">
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete All Campaigns
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
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
      
      {showDeleteAllNotification && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg save-notification">
          All campaigns deleted successfully!
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
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {/* Campaign ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign ID</label>
              <input
                type="text"
                value={formData.campaignId || ''}
                onChange={(e) => handleInputChange('campaignId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
              <input
                type="text"
                value={formData.campaignName || ''}
                onChange={(e) => handleInputChange('campaignName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Subject Line */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Line</label>
              <input
                type="text"
                value={formData.subjectLine || ''}
                onChange={(e) => handleInputChange('subjectLine', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Hero Image URL - New Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage || ''}
                onChange={(e) => handleInputChange('heroImage', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter the URL for the hero image"
              />
            </div>

            {/* Header */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Header</label>
              <input
                type="text"
                value={formData.header || ''}
                onChange={(e) => handleInputChange('header', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* CTA Text - New Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">CTA Text</label>
              <select
                value={formData.ctaText || ''}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select CTA Text</option>
                <option value="Shop now">Shop now</option>
                <option value="Activate">Activate</option>
              </select>
            </div>

            {/* Conditional Shop Now URL field */}
            {formData.ctaText === 'Shop now' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Shop Now URL</label>
                <input
                  type="text"
                  value={formData.shopNowUrl || ''}
                  onChange={(e) => handleInputChange('shopNowUrl', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter the URL for the Shop Now button"
                />
              </div>
            )}

            {/* Email Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Content</label>
              <BasicHtmlEditor
                value={formData.emailContent || ''}
                onChange={(value) => handleInputChange('emailContent', value)}
              />
            </div>

            {/* Preview Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Preview Text</label>
              <input
                type="text"
                value={formData.previewText || ''}
                onChange={(e) => handleInputChange('previewText', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Email Preview</h2>
          {/* Add debug info */}
          <div className="text-xs text-gray-500 mb-2">
            Debug: Attempting to load template
          </div>
          <IframeEmailPreview 
            formData={formData}
            partner={formData.cmPartner}
            template={{
              id: formData.templateId,
              name: formData.templateName
            }}
          />
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
