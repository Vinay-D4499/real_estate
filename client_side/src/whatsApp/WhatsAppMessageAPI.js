import axios from 'axios';
import { baseURL } from '../config/baseURL';


// export const getWhatsAppConversation = async (whatsappUserId) => {
//   try {
//     const response = await axios.get(`${baseURL}/api/whatsAppWebhook/conversation/${whatsappUserId}`);
//     // console.log(response.data)
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching WhatsApp conversation:', error);
//     return null;
//   }
// };

export const getWhatsAppConversation = async (whatsappUserId, limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${baseURL}/api/whatsAppWebhook/conversation/${whatsappUserId}`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching WhatsApp conversation:', error);
    return null;
  }
};

