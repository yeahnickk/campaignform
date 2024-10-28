/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Clock, FileText, Download, Bold, Italic, List, ChevronRight, Home, ArrowUp, Link, ArrowLeft } from "lucide-react";
import Papa from 'papaparse';

// Basic HTML Editor Component
const BasicHtmlEditor = ({ value, onChange }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const textareaRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

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

  const handleLinkButtonClick = () => {
    const textarea = document.getElementById('bodyCopyEditor');
    setSelectionStart(textarea.selectionStart);
    setSelectionEnd(textarea.selectionEnd);
    setLinkText(textarea.value.substring(textarea.selectionStart, textarea.selectionEnd));
    setShowLinkModal(true);
  };

  const insertLink = () => {
    const textarea = document.getElementById('bodyCopyEditor');
    const text = textarea.value;
    const before = text.substring(0, selectionStart);
    const after = text.substring(selectionEnd);
    
    // Create the HTML link tag
    const linkHtml = `<a href="${linkUrl}">${linkText || linkUrl}</a>`;
    const newText = `${before}${linkHtml}${after}`;
    
    onChange(newText);
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
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
        <button
          type="button"
          onClick={handleLinkButtonClick}
          className="p-2 border rounded hover:bg-gray-100"
          title="Hyperlink"
        >
          <Link className="h-4 w-4" />
        </button>
      </div>
      <textarea
        id="bodyCopyEditor"
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[200px] p-2 border rounded font-mono text-sm"
        placeholder="Enter your content here... Use the buttons above to add HTML formatting. Press Enter for new lines."
      />

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text to Display
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Link text"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={insertLink}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={!linkUrl}
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = ({ onSelectForm, onSearch, onLoadCsvBrief }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvText = e.target?.result;
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              const briefData = convertCsvToFormData(results.data[0]);
              onLoadCsvBrief(briefData);
            } else {
              alert('No data found in CSV file');
            }
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            alert('Error parsing CSV file');
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      }
    };
    reader.readAsText(file);
  };

  // Convert CSV data to form data structure
  const convertCsvToFormData = (csvRow) => {
    const formData = {
      campaignId: csvRow['Campaign ID'],
      campaignName: csvRow['Campaign Name'],
      cmPartner: csvRow['Partner'],
      templateName: csvRow['Template Name'],
      subjectLine: csvRow['Subject Line'],
      previewText: csvRow['Preview Text'],
      header: csvRow['Header'],
      heroImage: csvRow['Hero Image URL'],
      emailContent: csvRow['Email Content'],
      ctaText: csvRow['CTA Text'],
      shopNowUrl: csvRow['Shop Now URL'],
      targetAudience: csvRow['Target Audience'],
      segmentCriteria: csvRow['Segment Criteria'],
      exclusions: csvRow['Exclusions'],
      offerCount: parseInt(csvRow['Offer Count']) || 0
    };

    // Process offers
    for (let i = 0; i < formData.offerCount; i++) {
      formData[`offerId${i}`] = csvRow[`Offer ${i + 1} ID`];
      formData[`offerSpend${i}`] = csvRow[`Offer ${i + 1} Spend`];
      formData[`offerGet${i}`] = csvRow[`Offer ${i + 1} Get`];
      formData[`offerTitle${i}`] = csvRow[`Offer ${i + 1} Title`];
      formData[`offerStartDate${i}`] = csvRow[`Offer ${i + 1} Start Date`];
      formData[`offerEndDate${i}`] = csvRow[`Offer ${i + 1} End Date`];
      formData[`wotImageUrl${i}`] = csvRow[`Offer ${i + 1} WOT Image URL`];
    }

    return formData;
  };

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
            {/* EDM Card */}
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

            {/* Modified WOT Card */}
            <div className="bg-white p-6 space-y-4 rounded-lg shadow opacity-75">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">WOT Only</h2>
                <p className="text-sm text-gray-600 mt-2">Coming soon: Generate WOT documentation</p>
              </div>
              <div className="flex items-center text-green-600">
                <span className="text-sm font-medium">Coming soon</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Modified Upload Existing Brief card */}
            <div 
              className="bg-white p-6 space-y-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleUploadClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv"
                onChange={handleFileUpload}
              />
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Upload Existing Brief</h2>
                <p className="text-sm text-gray-600 mt-2">Upload and edit previously exported campaign briefs</p>
              </div>
              <div className="flex items-center text-purple-600">
                <span className="text-sm font-medium">Upload CSV</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>

          {/* Search section remains the same */}
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
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadTemplate = async () => {
      setIsLoading(true);
      try {
        let templatePath = '';
        
        // Determine which template to load
        if (template?.id === 'COLES_STD_MKT_01') {
          templatePath = '/templates/email_preview.html';
        } else if (template?.id === 'COLES_TRANS_01') {
          templatePath = '/templates/ColesTrans.html';
        }

        if (templatePath) {
          const response = await fetch(templatePath);
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
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading template:', error);
        setIsLoading(false);
      }
    };

    loadTemplate();

    // Height adjustment logic
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
      {/* Subject Line and Preheader Preview */}
      <div className="bg-gray-100 p-4 rounded-lg space-y-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Subject Line Preview:</div>
          <div className="font-medium">
            {formData?.subjectLine || 'No subject line entered'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Preheader Text Preview:</div>
          <div className="font-medium">
            {formData?.previewText || 'No preheader text entered'}
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
              {offerOptions.map((num) => {
                const index = num - 1;
                const offerId = formData[`offerId${index}`];
                const displayName = offerId ? `Offer - ${offerId}` : `Offer ${num}`;
                return (
                  <option key={index} value={index}>
                    {displayName}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {/* Only show debug message while loading */}
      {isLoading && (
        <div className="text-xs text-gray-500 mb-2">
          Debug: Attempting to load template
        </div>
      )}

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
  const [activeView, setActiveView] = useState(() => {
    if (loadedCampaign?.campaignId) return 'form';
    return 'campaignId';
  });

  const [formData, setFormData] = useState(() => {
    if (loadedCampaign) {
      return {
        ...loadedCampaign,
        cmPartner: loadedCampaign.cmPartner || partner,
        templateId: loadedCampaign.templateId || template.id,
        templateName: loadedCampaign.templateName || template.name,
        offerCount: loadedCampaign.offerCount || 0
      };
    }
    return {
      cmPartner: partner,
      templateId: template.id,
      templateName: template.name,
      offerCount: 0,
      campaignId: ''
    };
  });

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showExistingCampaignModal, setShowExistingCampaignModal] = useState(false);
  const [existingCampaign, setExistingCampaign] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkExistingCampaign = (campaignId) => {
    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    return savedCampaigns.find(c => c.campaignId === campaignId);
  };

  const handleCampaignIdSubmit = (e) => {
    e.preventDefault();
    
    if (formData.campaignId) {
      const existing = checkExistingCampaign(formData.campaignId);
      
      if (existing) {
        setExistingCampaign(existing);
        setShowExistingCampaignModal(true);
      } else if (validateCampaignId(formData.campaignId)) {
        setActiveView('form');
      } else {
        alert('Please enter a valid Campaign ID');
      }
    }
  };

  const handleExistingCampaignChoice = (choice) => {
    if (choice === 'load') {
      // Load the existing campaign
      setFormData(existingCampaign);
    }
    // For 'new', keep the current formData
    
    setShowExistingCampaignModal(false);
    setActiveView('form');
  };

  const handleSave = () => {
    try {
      // Get existing campaigns from localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      
      // Check if campaign already exists
      const campaignIndex = existingCampaigns.findIndex(
        c => c.campaignId === formData.campaignId
      );

      // Create a clean copy of the form data
      const campaignToSave = {
        ...formData,
        cmPartner: partner,
        templateId: template.id,
        templateName: template.name,
        lastSaved: new Date().toISOString()
      };

      if (campaignIndex !== -1) {
        // Update existing campaign
        existingCampaigns[campaignIndex] = campaignToSave;
      } else {
        // Add new campaign
        existingCampaigns.push(campaignToSave);
      }

      // Save back to localStorage
      localStorage.setItem('campaigns', JSON.stringify(existingCampaigns));

      // Show success notification
      setShowSaveNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowSaveNotification(false);
      }, 3000);

      // Call the onSave prop if provided
      if (onSave) {
        onSave(campaignToSave);
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Failed to save campaign. Please try again.');
    }
  };

  return (
    <Layout currentPage="Campaign Brief" partner={partner} template={template.name} onNavigate={onNavigate}>
      <div className="max-w-[1920px] w-full mx-auto space-y-8">
        {/* Existing Campaign Modal */}
        {showExistingCampaignModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Campaign ID Already Exists
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                A campaign with ID "{formData.campaignId}" already exists. Would you like to load the existing campaign or start a new one with this ID?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleExistingCampaignChoice('load')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Load Existing
                </button>
                <button
                  onClick={() => handleExistingCampaignChoice('new')}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Start New
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show Campaign ID form if in campaignId view and no loaded campaign */}
        {activeView === 'campaignId' && !loadedCampaign && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleCampaignIdSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Enter Campaign ID</h2>
              <div>
                <label htmlFor="campaignId" className="block text-sm font-medium text-gray-700">
                  Campaign ID
                </label>
                <input
                  type="text"
                  id="campaignId"
                  value={formData.campaignId || ''}
                  onChange={(e) => handleInputChange('campaignId', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter Campaign ID"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Show header and tabs only after Campaign ID is submitted or when campaign is loaded */}
        {activeView !== 'campaignId' && (
          <>
            {/* Header Section */}
            <div className="bg-white shadow relative">
              {/* Success Notification */}
              {showSaveNotification && (
                <div className="absolute top-0 left-0 right-0 transform -translate-y-full">
                  <div className="bg-green-500 text-white px-4 py-2 text-center">
                    Campaign saved successfully!
                  </div>
                </div>
              )}

              <div className="px-4 sm:px-6 lg:max-w-[1920px] lg:mx-auto lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                            {formData.campaignName || 'New Campaign Brief'}
                          </h1>
                        </div>
                        <dl className="mt-2 flex flex-col sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Campaign ID</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                            {formData.campaignId}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const csvData = convertFormDataToCsv(formData);
                        const blob = new Blob([csvData], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.setAttribute('hidden', '');
                        a.setAttribute('href', url);
                        a.setAttribute('download', `campaign-brief-${formData.campaignId || 'draft'}.csv`);
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
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
              <button
                onClick={() => setActiveView('wot')}
                className={`px-4 py-2 rounded-md ${activeView === 'wot' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Web Offer Tile Preview
              </button>
            </div>

            {/* Content Section */}
            {activeView === 'form' && (
              <FormView formData={formData} handleInputChange={handleInputChange} template={template} />
            )}
            {activeView === 'data' && (
              <DataTeamView formData={formData} handleInputChange={handleInputChange} />
            )}
            {activeView === 'offers' && (
              <OffersView formData={formData} handleInputChange={handleInputChange} />
            )}
            {activeView === 'wot' && (
              <WebOfferTileView formData={formData} handleInputChange={handleInputChange} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

// Helper function for CSV export
const convertFormDataToCsv = (formData) => {
  // Convert form data to CSV format
  const headers = [
    'Campaign ID',
    'Campaign Name',
    'Partner',
    'Template Name',
    'Subject Line',
    'Preview Text',
    'Header',
    'Hero Image URL',
    'Email Content',
    'CTA Text',
    'Shop Now URL',
    'Target Audience',
    'Segment Criteria',
    'Exclusions',
    'Offer Count'
  ];

  const values = [
    formData.campaignId || '',
    formData.campaignName || '',
    formData.cmPartner || '',
    formData.templateName || '',
    formData.subjectLine || '',
    formData.previewText || '',
    formData.header || '',
    formData.heroImage || '',
    formData.emailContent || '',
    formData.ctaText || '',
    formData.shopNowUrl || '',
    formData.targetAudience || '',
    formData.segmentCriteria || '',
    formData.exclusions || '',
    formData.offerCount || 0
  ];

  // Add offer-specific fields
  for (let i = 0; i < formData.offerCount; i++) {
    headers.push(
      `Offer ${i + 1} ID`,
      `Offer ${i + 1} Spend`,
      `Offer ${i + 1} Get`,
      `Offer ${i + 1} Title`,
      `Offer ${i + 1} Start Date`,
      `Offer ${i + 1} End Date`,
      `Offer ${i + 1} WOT Image URL`
    );
    values.push(
      formData[`offerId${i}`] || '',
      formData[`offerSpend${i}`] || '',
      formData[`offerGet${i}`] || '',
      formData[`offerTitle${i}`] || '',
      formData[`offerStartDate${i}`] || '',
      formData[`offerEndDate${i}`] || '',
      formData[`wotImageUrl${i}`] || ''
    );
  }

  return `${headers.join(',')}\n${values.join(',')}`;
};

const SearchResults = ({ searchQuery, onLoadCampaign, onBack }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    const filteredCampaigns = savedCampaigns.filter(campaign => 
      campaign.campaignId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.campaignName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCampaigns(filteredCampaigns);
  }, [searchQuery]);

  const handleDelete = (campaignId) => {
    // Get current campaigns
    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    // Filter out the campaign to delete
    const updatedCampaigns = savedCampaigns.filter(c => c.campaignId !== campaignId);
    // Save back to localStorage
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    // Update state
    setCampaigns(updatedCampaigns);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      
      {campaigns.length === 0 ? (
        <p className="text-gray-500">No campaigns found matching "{searchQuery}"</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <li key={campaign.campaignId}>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">
                            {campaign.campaignName || 'Untitled Campaign'}
                          </p>
                          <p className="ml-1 font-normal text-gray-500">
                            ({campaign.campaignId})
                          </p>
                        </div>
                        <div className="mt-2 flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>Template: {campaign.templateName}</p>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <p>Partner: {campaign.cmPartner}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => onLoadCampaign(campaign)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.campaignId)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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

  const renderOfferFields = (index) => {
    const offerId = formData[`offerId${index}`] || '';
    const displayName = offerId ? `Offer - ${offerId}` : `Offer ${index + 1}`;

    return (
      <div key={index} className="border p-4 rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">{displayName}</h3>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Offer ID</label>
            <input
              type="text"
              value={formData[`offerId${index}`] || ''}
              onChange={(e) => handleInputChange(`offerId${index}`, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter Offer ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">WOT Image URL</label>
            <input
              type="text"
              value={formData[`wotImageUrl${index}`] || ''}
              onChange={(e) => handleInputChange(`wotImageUrl${index}`, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter WOT Image URL"
            />
          </div>
        </div>
      </div>
    );
  };

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

            {/* Preheader Text (renamed from Preview Text) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Preheader Text</label>
              <input
                type="text"
                value={formData.previewText || ''}
                onChange={(e) => handleInputChange('previewText', e.target.value)}
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
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Email Preview</h2>
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

const WebOfferTilePreview = ({ formData, selectedOfferIndex }) => {
  const [iframeContent, setIframeContent] = useState('');
  const [iframeHeight, setIframeHeight] = useState('800px');
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadTemplate = async () => {
      setIsLoading(true);
      try {
        const templatePath = '/templates/WOT.html';
        const response = await fetch(templatePath);
        let html = await response.text();
        
        // Define all possible offer field patterns
        const offerFields = [
          'OFFERGET',
          'OFFERSPEND',
          'OFFERTITLE',
          'OFFERENDDATE',
          'OFFERSTARTDATE',
          'OFFERID',
          'WOTIMAGEURL'
        ];

        // Replace all matching placeholders with their corresponding values
        offerFields.forEach(field => {
          const placeholder = `$${field}$`;
          const formDataKey = field.toLowerCase();
          if (html.includes(placeholder)) {
            html = html.replace(
              placeholder, 
              formData?.[`${formDataKey}${selectedOfferIndex}`] || ''
            );
          }
        });
        
        setIframeContent(html);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading WOT template:', error);
        setIsLoading(false);
      }
    };

    loadTemplate();
  }, [formData, selectedOfferIndex]);

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-xs text-gray-500 mb-2">
          Loading preview...
        </div>
      )}
      <div className="relative">
        <iframe
          ref={iframeRef}
          srcDoc={iframeContent}
          title="Web Offer Tile Preview"
          className="w-full border-0"
          style={{ height: iframeHeight }}
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
        />
      </div>
    </div>
  );
};

const WebOfferTileView = ({ formData, handleInputChange }) => {
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {formData.offerCount > 0 ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Offer to Preview</label>
                <select
                  value={selectedOfferIndex}
                  onChange={(e) => setSelectedOfferIndex(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {[...Array(formData.offerCount)].map((_, index) => {
                    const offerId = formData[`offerId${index}`];
                    const displayName = offerId ? `Offer - ${offerId}` : `Offer ${index + 1}`;
                    return (
                      <option key={index} value={index}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No offers available. Please add offers in the Offers tab.</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Web Offer Tile Preview</h2>
          {formData.offerCount > 0 ? (
            <WebOfferTilePreview 
              formData={formData} 
              selectedOfferIndex={selectedOfferIndex}
            />
          ) : (
            <p className="text-gray-500">Please add offers to see the preview.</p>
          )}
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

  const handleLoadCsvBrief = (briefData) => {
    // Map the template name to the correct template ID and configuration
    let templateConfig;
    switch (briefData.templateName) {
      case 'Standard Marketing Campaign':
        templateConfig = {
          id: 'COLES_STD_MKT_01',
          name: briefData.templateName,
          previewPath: '/templates/email_preview.html'
        };
        break;
      case 'Transactional Campaign':
        templateConfig = {
          id: 'COLES_TRANS_01',
          name: briefData.templateName,
          previewPath: '/templates/ColesTrans.html'
        };
        break;
      // Add other template mappings as needed
      default:
        templateConfig = {
          id: 'COLES_STD_MKT_01', // Default to standard if unknown
          name: briefData.templateName,
          previewPath: '/templates/email_preview.html'
        };
    }

    // Set the loaded campaign data with the correct template configuration
    setLoadedCampaign({
      ...briefData,
      templateId: templateConfig.id,
      previewPath: templateConfig.previewPath
    });
    
    setSelectedPartner(briefData.cmPartner);
    setSelectedTemplate(templateConfig);
    setCurrentPage('form');
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage 
          onSelectForm={handleSelectForm} 
          onSearch={handleSearch}
          onLoadCsvBrief={handleLoadCsvBrief}
        />
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
          loadedCampaign={loadedCampaign}  // This now contains the CSV data
        />
      )}
    </>
  );
};

export default App;
