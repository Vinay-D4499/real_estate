const { default: axios } = require('axios');
const { sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const WebhookMessage = require('../models/webhookMessageModel');
const WebhookMessageStatus = require('../models/webhookMessageStatusModel');

const phone_number_id = process.env.PHONE_NUMBER_ID;

// async function getConversationByWhatsappUserId(whatsappUserId) {
//     try {
//         const messages = await WebhookMessage.findAll({
//             where: { whatsappUserId },
//             include: [
//                 {
//                     model: WebhookMessageStatus,
//                     as: 'statuses',
//                     required: false,
//                 },
//             ],
//             order: [['timestamp', 'ASC']],
//         });

//         return messages;
//     } catch (error) {
//         console.error("Error fetching conversation:", error);
//         throw error;
//     }
// }

async function getConversationByWhatsappUserId(whatsappUserId, limit = 10, offset = 0) {
    try {
        const messages = await WebhookMessage.findAll({
            where: { whatsappUserId },
            include: [
                {
                    model: WebhookMessageStatus,
                    as: 'statuses',
                    required: false,
                },
            ],
            order: [['timestamp', 'ASC']], // Ensure messages are ordered by timestamp
            limit, // Limit the number of messages returned
            offset, // Offset for pagination (starting point)
        });

        return messages;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw error;
    }
}


/**
 * Sends a text message via WhatsApp API and saves it to the database.
 * @param {string} to - Recipient's WhatsApp number
 * @param {string} body - Text message body
 * @returns {Promise<Object>} - Sent message data
 */
async function sendTextMessage(to, body) {
    try {
        console.log("phone number ID : ", phone_number_id)
        const response = await axios({
            url: `https://graph.facebook.com/v20.0/${phone_number_id}/messages`,
            method: 'post',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                messaging_product: 'whatsapp',
                to,
                type: 'text',
                text: { body }
            }
        });

        const messageData = {
            whatsappUserId: to,
            messageId: response.data.messages[0].id,
            messageBody: body,
            phoneNumberId: phone_number_id,
            timestamp: new Date(),
            direction: 'outgoing'
        };

        await WebhookMessage.create(messageData);
        return response.data;
    } catch (error) {
        console.error('Error sending text message:', error.response ? error.response.data : error.message);
        throw new Error('Failed to send text message');
    }
}

/**
 * Sends a media message via WhatsApp API, saves it to the database, and uploads media to DigitalOcean Spaces.
 * @param {string} to - Recipient's WhatsApp number
 * @param {string} mediaId - WhatsApp media ID
 * @param {string} mimeType - MIME type of the media
 * @param {string} caption - Optional caption for the media
 * @returns {Promise<Object>} - Sent message data
 */
async function sendMediaMessage(to, mediaFile, caption) {
    try {
        // Step 1: Upload media file to WhatsApp to get a media ID
        const mediaId = await uploadMediaToWhatsApp(mediaFile);

        // Step 2: Send media message using WhatsApp API
        const mimeType = mediaFile.mimetype;
        const response = await sendMediaMessageToWhatsApp(to, mediaId, mimeType, caption);

        // Step 3: Upload media file to DigitalOcean Spaces and save message data
        const mediaUrl = await uploadMediaToSpaces(mediaId, mimeType);
        
        const messageData = {
            whatsappUserId: to,
            messageId: response.data.messages[0].id,
            phoneNumberId: process.env.PHONE_NUMBER_ID,
            mediaId,
            mediaType: 'image',
            caption,
            mimeType,
            mediaPathUrl: mediaUrl,
            timestamp: new Date(),
            direction: 'outgoing'
        };

        await WebhookMessage.create(messageData);
        return response.data;
    } catch (error) {
        console.error('Error sending media message:', error);
        throw new Error('Failed to send media message');
    }
}

// Helper function: Upload media to WhatsApp and get a media ID
const FormData = require('form-data');
const s3 = require('../config/digitalOceanConfig');

async function uploadMediaToWhatsApp(mediaFile) {
    try {
        const formData = new FormData();
        formData.append('file', mediaFile.buffer, {
            filename: mediaFile.originalname,  // Ensure the original filename is passed
            contentType: mediaFile.mimetype,
        });
        formData.append('messaging_product', 'whatsapp'); // Required parameter by WhatsApp API

        const response = await axios.post(
            `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/media`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    ...formData.getHeaders()  // Important for form-data headers
                }
            }
        );

        return response.data.id; // Return the mediaId from WhatsApp response
    } catch (error) {
        console.error('Error uploading media to WhatsApp:', error.response ? error.response.data : error.message);
        throw new Error('Failed to upload media to WhatsApp');
    }
}

// Helper function: Send the media message to WhatsApp using the media ID
async function sendMediaMessageToWhatsApp(to, mediaId, mimeType, caption) {
    try {
        // Determine the media type based on mimeType
        const mediaType = mimeType.startsWith('video/') ? 'video' : 'image';

        const response = await axios({
            url: `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                messaging_product: 'whatsapp',
                to,
                type: mediaType,  // Sets media type dynamically
                [mediaType]: {
                    id: mediaId,
                    caption: caption || '',
                },
            },
        });

        return response;
    } catch (error) {
        console.error('Error sending media message to WhatsApp:', error.response ? error.response.data : error.message);
        throw new Error('Failed to send media message');
    }
}


// Helper function: Upload the media to DigitalOcean Spaces for future access
async function uploadMediaToSpaces(mediaId, mimeType) {
    try {
        const mediaUrlResponse = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}`, {
            headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` }
        });
        const mediaUrl = mediaUrlResponse.data.url;

        const mediaResponse = await axios.get(mediaUrl, {
            responseType: 'arraybuffer',
            headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` }
        });

        const extension = mimeType.split('/')[1];
        const fileKey = `${process.env.CLIENT_NAME}/whatsApp_media/${uuidv4()}.${extension}`;

        const params = {
            Bucket: 'real_estate',
            Key: fileKey,
            Body: mediaResponse.data,
            ACL: 'public-read',
            ContentType: mimeType,
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
    } catch (error) {
        console.error('Error uploading media to DigitalOcean Spaces:', error);
        throw new Error('Failed to upload media');
    }
}



module.exports = {
    getConversationByWhatsappUserId,
    sendTextMessage,
    sendMediaMessage,
    uploadMediaToSpaces
};
