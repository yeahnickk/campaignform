import { ChevronRight } from 'lucide-react';

const SearchResults = ({ campaigns, onSelectCampaign }) => {
  const campaignsList = Array.isArray(campaigns) ? campaigns : [];

  if (campaignsList.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No campaigns found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="divide-y">
        {campaignsList.map((campaign) => (
          <div
            key={campaign.id}
            className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
            onClick={() => onSelectCampaign && onSelectCampaign(campaign)}
          >
            <div>
              <h3 className="font-medium text-gray-900">
                {campaign.campaign_name || campaign.campaign_id}
              </h3>
              <p className="text-sm text-gray-500">
                ID: {campaign.campaign_id} | Partner: {campaign.cm_partner}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(campaign.created_at).toLocaleDateString()}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 