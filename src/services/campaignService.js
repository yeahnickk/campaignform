import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where 
} from '@firebase/firestore';
import { db } from '../firebase/config';

export const campaignService = {
  // Save campaign
  async saveCampaign(campaignData) {
    try {
      const campaignsRef = collection(db, 'campaigns');
      const docRef = await addDoc(campaignsRef, {
        ...campaignData,
        createdAt: new Date().toISOString(),
        lastSaved: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving campaign:', error);
      throw error;
    }
  },

  // Search campaign
  async searchCampaign(searchId) {
    try {
      const campaignsRef = collection(db, 'campaigns');
      const q = query(campaignsRef, where('campaignId', '==', searchId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Error searching campaign:', error);
      throw error;
    }
  }
}; 