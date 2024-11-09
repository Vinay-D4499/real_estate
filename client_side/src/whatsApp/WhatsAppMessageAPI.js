import axios from 'axios';
import { baseURL } from '../config/baseURL';


export const getWhatsAppConversation = async (whatsappUserId) => {
  try {
    const response = await axios.get(`${baseURL}/api/whatsAppWebhook/conversation/${whatsappUserId}`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching WhatsApp conversation:', error);
    return null;
  }
};
