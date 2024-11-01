import { supabase } from './supabase'

export async function saveCampaign(formData) {
  try {
    const formatDate = (dateString) => {
      if (!dateString) return null;
      try {
        return new Date(dateString).toISOString();
      } catch (e) {
        console.warn('Invalid date:', dateString);
        return null;
      }
    };

    const offers = Array.from({length: formData.offerCount || 0}, (_, i) => ({
      offer_id: formData[`offerId${i}`] || '',
      offer_spend: formData[`offerSpend${i}`] || '',
      offer_get: formData[`offerGet${i}`] || '',
      offer_title: formData[`offerTitle${i}`] || '',
      offer_start_date: formatDate(formData[`offerStartDate${i}`]),
      offer_end_date: formatDate(formData[`offerEndDate${i}`]),
      wot_image_url: formData[`wotImageUrl${i}`] || ''
    }));

    const { data, error } = await supabase
      .from('CampaignData')
      .upsert({
        campaign_id: formData.campaignId,
        campaign_name: formData.campaignName,
        cm_partner: formData.cmPartner,
        template_name: formData.templateName,
        template_id: formData.templateId,
        campaign_start: formatDate(formData.campaignStart),
        campaign_end: formatDate(formData.campaignEnd),
        send_date: formatDate(formData.sendDate),
        approval_date: formatDate(formData.approvalDate),
        subject_line: formData.subjectLine,
        preview_text: formData.previewText,
        header: formData.header,
        hero_image: formData.heroImage,
        email_content: formData.emailContent,
        cta_text: formData.ctaText,
        shop_now_url: formData.shopNowUrl,
        body_copy: formData.bodyCopy,
        terms_conditions: formData.termsConditions,
        edm_type: formData.edmType,
        send_time: formData.sendTime,
        timezone: formData.timezone,
        from_name: formData.fromName,
        from_email: formData.fromEmail,
        reply_to: formData.replyTo,
        campaign_type: formData.campaignType,
        campaign_status: formData.campaignStatus,
        business_objective: formData.businessObjective,
        campaign_description: formData.campaignDescription,
        kpis: formData.kpis,
        success_metrics: formData.successMetrics,
        target_audience: formData.targetAudience,
        segment_criteria: formData.segmentCriteria,
        exclusions: formData.exclusions,
        primary_audience: formData.primaryAudience,
        secondary_audience: formData.secondaryAudience,
        audience_size: formData.audienceSize,
        audience_criteria: formData.audienceCriteria,
        offer_count: formData.offerCount,
        offers: offers,
        last_saved: new Date().toISOString()
      }, {
        onConflict: 'campaign_id'
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving campaign:', error);
    throw error;
  }
}

export async function fetchCampaign(campaignId) {
  try {
    const { data, error } = await supabase
      .from('CampaignData')
      .select('*')
      .eq('campaign_id', campaignId)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching campaign:', error)
    throw error
  }
}

export async function searchCampaigns(query) {
  try {
    const { data, error } = await supabase
      .from('CampaignData')
      .select('*')
      .or(`campaign_id.ilike.%${query}%,campaign_name.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error searching campaigns:', error)
    throw error
  }
}

export async function deleteCampaign(campaignId) {
  try {
    const { error } = await supabase
      .from('CampaignData')
      .delete()
      .eq('campaign_id', campaignId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting campaign:', error)
    throw error
  }
} 