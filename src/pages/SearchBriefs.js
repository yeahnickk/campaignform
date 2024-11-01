'use client';

import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { ChevronRight, Search } from 'lucide-react';
import Layout from '../components/Layout';


const SearchBriefs = ({ onSelectBrief }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let query = supabase
        .from('CampaignData')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('campaign_id', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching briefs:', error);
      // You might want to add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout currentPage="Search Briefs">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Search Campaign Briefs</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Campaign ID..."
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              disabled={isLoading}
            >
              <Search className="w-4 h-4" />
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Results List */}
        <div className="space-y-4">
          {searchResults.map((brief) => (
            <div
              key={brief.id}
              onClick={() => onSelectBrief(brief)}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    {brief.campaign_name || 'Unnamed Campaign'}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Campaign ID: {brief.campaign_id}</p>
                    <p>Partner: {brief.cm_partner}</p>
                    <p>Created: {new Date(brief.created_at).toLocaleDateString()}</p>
                    <p>Template: {brief.template_name}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}

          {searchResults.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 py-8">
              {searchQuery 
                ? 'No briefs found matching your search'
                : 'Enter a Campaign ID to search for briefs'}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchBriefs; 