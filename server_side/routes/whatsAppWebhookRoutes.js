const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const WebhookMessage = require('../models/webhookMessageModel');
const WebhookMessageStatus = require('../models/webhookMessageStatusModel');
const User = require('../models/userModel')
const { Op } = require('sequelize');
const s3 = require('../config/digitalOceanConfig');
const { v4: uuidv4 } = require('uuid');
const webhookRoutes = express.Router();
const whatsAppWebhookController = require('../controllers/whatsAppWebhookController');
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const token = process.env.WHATSAPP_TOKEN;
const mytoken = process.env.CHECK_TOKEN;

webhookRoutes.get('/webhook', (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challenge);
        } else {
            res.status(403);
        }
    }
});

// webhookRoutes.post('/webhook', async (req, res) => {
//     const bodyParam = req.body;
//     console.log("Received webhook payload at:", new Date().toISOString());
//     console.log("Received webhook payload:", JSON.stringify(bodyParam, null, 2));

//     if (bodyParam.object === 'whatsapp_business_account') {
//         const entries = bodyParam.entry;

//         for (const entry of entries) {
//             const changes = entry.changes;

//             if (changes && changes.length > 0) {
//                 for (const change of changes) {
//                     const value = change.value;

//                     // Process incoming messages
//                     if (value.messages && value.messages.length > 0) {
//                         for (const message of value.messages) {
//                             const phoneNumberId = value.metadata.phone_number_id;
//                             const from = message.from;
//                             const messageId = message.id;
//                             const timestamp = new Date(message.timestamp * 1000);
                    
//                             const isSentByBusiness = from === process.env.WHATSAPP_BUSINESS_PHONE_NUMBER; // Your WhatsApp number
                    
//                             let messageData = {
//                                 whatsappUserId: from,
//                                 whatsappUserName: message.profile ? message.profile.name : null,
//                                 phoneNumberId: phoneNumberId,
//                                 messageId: messageId,
//                                 messageBody: message.text ? message.text.body : null,
//                                 timestamp: timestamp,
//                                 direction: isSentByBusiness ? 'outgoing' : 'incoming'
//                             };
                    
//                             // Handle media messages
//                             if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'document') {
//                                 const mediaId = message[message.type].id;
//                                 const mimeType = message[message.type].mime_type;
//                                 const caption = message.caption || null;
                    
//                                 const mediaPath = await downloadMedia(mediaId, mimeType, process.env.CLIENT_NAME);
                    
//                                 messageData = {
//                                     ...messageData,
//                                     mediaId: mediaId,
//                                     mediaType: message.type,
//                                     caption: caption,
//                                     mimeType: mimeType,
//                                     mediaPathUrl: mediaPath
//                                 };
//                             }
                    
//                             // Handle location messages
//                             if (message.location) {
//                                 messageData = {
//                                     ...messageData,
//                                     locationLatitude: message.location.latitude,
//                                     locationLongitude: message.location.longitude,
//                                     locationName: message.location.name,
//                                     locationAddress: message.location.address
//                                 };
//                             }
                    
//                             // Save message to database
//                             try {
//                                 await WebhookMessage.create(messageData);
//                                 console.log("Message saved to WebhookMessage table");
//                             } catch (error) {
//                                 console.error("Error saving message to WebhookMessage table:", error);
//                             }
//                         }
//                     }
                    

//                     // Process message statuses for outgoing messages
//                     if (value.statuses && value.statuses.length > 0) {
//                         for (const status of value.statuses) {
//                             const statusTimestamp = new Date(status.timestamp * 1000);
//                             const recipientId = status.recipient_id;
//                             const isOutgoing = recipientId === process.env.WHATSAPP_BUSINESS_PHONE_NUMBER;

//                             const statusData = {
//                                 messageId: status.id,
//                                 recipientId: recipientId,
//                                 status: status.status,
//                                 timestamp: statusTimestamp,
//                                 conversationId: status.conversation ? status.conversation.id : null,
//                                 conversationCategory: status.conversation ? status.conversation.origin.type : null,
//                                 isBillable: status.pricing ? status.pricing.billable : false,
//                                 errorCode: status.errors ? status.errors[0].code : null,
//                                 errorTitle: status.errors ? status.errors[0].title : null,
//                                 errorMessage: status.errors ? status.errors[0].message : null,
//                                 errorDetails: status.errors ? status.errors[0].error_data.details : null,
//                                 direction: isOutgoing ? 'outgoing' : 'incoming'
//                             };

//                             try {
//                                 const message = await WebhookMessage.findOne({
//                                     where: {
//                                         whatsappUserId: recipientId,
//                                         messageId: status.id
//                                     }
//                                 });

//                                 if (message) {
//                                     statusData.messageId = message.messageId;
//                                     await WebhookMessageStatus.create(statusData);
//                                     console.log("Status saved to WebhookMessageStatus table");
//                                 } else {
//                                     console.error("No matching message found for status update with recipient ID:", recipientId, "and message ID:", status.id);
//                                 }
//                             } catch (error) {
//                                 console.error("Error saving status to WebhookMessageStatus table:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         return res.sendStatus(200);
//     }

//     console.log("Invalid webhook event received.");
//     return res.sendStatus(404);
// });

//-------------------------------------------------------------------------------///

// webhookRoutes.post('/webhook', async (req, res) => {
//     const bodyParam = req.body;
//     console.log("Received webhook payload at:", new Date().toISOString());
//     console.log("Received webhook payload:", JSON.stringify(bodyParam, null, 2));

//     if (bodyParam.object === 'whatsapp_business_account') {
//         const entries = bodyParam.entry;

//         for (const entry of entries) {
//             const changes = entry.changes;

//             if (changes && changes.length > 0) {
//                 for (const change of changes) {
//                     const value = change.value;
//                     const phoneNumberId = value.metadata.phone_number_id; // Your business phone number ID

//                     // Process incoming messages
//                     if (value.messages && value.messages.length > 0) {
//                         for (const message of value.messages) {
//                             const from = message.from; // User's WhatsApp ID
//                             const messageId = message.id;
//                             const timestamp = new Date(message.timestamp * 1000);

//                             // Determine direction based on `from` and `phoneNumberId`
//                             const isIncoming = from && from !== phoneNumberId;
//                             const direction = isIncoming ? 'incoming' : 'outgoing';

//                             let messageData = {
//                                 whatsappUserId: from,
//                                 whatsappUserName: message.profile ? message.profile.name : null,
//                                 phoneNumberId: phoneNumberId,
//                                 messageId: messageId,
//                                 messageBody: message.text ? message.text.body : null,
//                                 timestamp: timestamp,
//                                 direction: direction
//                             };

//                             // Handle media messages
//                             if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'document') {
//                                 const mediaId = message[message.type].id;
//                                 const mimeType = message[message.type].mime_type;
//                                 const caption = message.caption || null;

//                                 const mediaPath = await downloadMedia(mediaId, mimeType, process.env.CLIENT_NAME);

//                                 messageData = {
//                                     ...messageData,
//                                     mediaId: mediaId,
//                                     mediaType: message.type,
//                                     caption: caption,
//                                     mimeType: mimeType,
//                                     mediaPathUrl: mediaPath
//                                 };
//                             }

//                             // Handle location messages
//                             if (message.location) {
//                                 messageData = {
//                                     ...messageData,
//                                     locationLatitude: message.location.latitude,
//                                     locationLongitude: message.location.longitude,
//                                     locationName: message.location.name,
//                                     locationAddress: message.location.address
//                                 };
//                             }

//                             // Save message to database
//                             try {
//                                 await WebhookMessage.create(messageData);
//                                 console.log("Message saved to WebhookMessage table");
//                             } catch (error) {
//                                 console.error("Error saving message to WebhookMessage table:", error);
//                             }
//                         }
//                     }

//                     // Process message statuses for outgoing messages
//                     if (value.statuses && value.statuses.length > 0) {
//                         for (const status of value.statuses) {
//                             const statusTimestamp = new Date(status.timestamp * 1000);
//                             const recipientId = status.recipient_id;

//                             // Determine direction based on `recipient_id` and `phoneNumberId`
//                             const isOutgoing = recipientId === phoneNumberId;
//                             const direction = isOutgoing ? 'outgoing' : 'incoming';

//                             const statusData = {
//                                 messageId: status.id,
//                                 recipientId: recipientId,
//                                 status: status.status,
//                                 timestamp: statusTimestamp,
//                                 conversationId: status.conversation ? status.conversation.id : null,
//                                 conversationCategory: status.conversation ? status.conversation.origin.type : null,
//                                 isBillable: status.pricing ? status.pricing.billable : false,
//                                 errorCode: status.errors ? status.errors[0].code : null,
//                                 errorTitle: status.errors ? status.errors[0].title : null,
//                                 errorMessage: status.errors ? status.errors[0].message : null,
//                                 errorDetails: status.errors ? status.errors[0].error_data.details : null,
//                                 direction: direction
//                             };

//                             try {
//                                 const message = await WebhookMessage.findOne({
//                                     where: {
//                                         whatsappUserId: recipientId,
//                                         messageId: status.id
//                                     }
//                                 });

//                                 if (message) {
//                                     statusData.messageId = message.messageId;
//                                     await WebhookMessageStatus.create(statusData);
//                                     console.log("Status saved to WebhookMessageStatus table");
//                                 } else {
//                                     console.error("No matching message found for status update with recipient ID:", recipientId, "and message ID:", status.id);
//                                 }
//                             } catch (error) {
//                                 console.error("Error saving status to WebhookMessageStatus table:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         return res.sendStatus(200);
//     }

//     console.log("Invalid webhook event received.");
//     return res.sendStatus(404);
// });



//-----------------------------------------------------------////


webhookRoutes.post('/webhook', async (req, res) => {
    const bodyParam = req.body;
    console.log("Received webhook payload at:", new Date().toISOString());
    console.log("Received webhook payload:", JSON.stringify(bodyParam, null, 2));

    if (bodyParam.object === 'whatsapp_business_account') {
        const entries = bodyParam.entry;

        for (const entry of entries) {
            const changes = entry.changes;

            if (changes && changes.length > 0) {
                for (const change of changes) {
                    const value = change.value;
                    const phoneNumberId = value.metadata.phone_number_id; // Your business phone number ID

                    // Process incoming messages
                    if (value.messages && value.messages.length > 0) {
                        for (const message of value.messages) {
                            const from = message.from; // User's WhatsApp ID (includes country code)
                            const userPhone = from.replace(/^91/, ''); // Remove country code '91'
                            console.log("user phone :", userPhone)
                            const timestamp = new Date(message.timestamp * 1000);

                            // Check if the phone number exists in the Users table
                            try {
                                const user = await User.findOne({
                                    where: { phone: userPhone }
                                });

                                if (user) {
                                    console.log("user found ")
                                    // Update the last_interaction_time column
                                    await User.update({ last_interaction_time: timestamp });
                                    console.log(`Updated last_interaction_time for user: ${userPhone}`);
                                } else {
                                    console.log(`Phone number not found in Users table: ${userPhone}`);
                                }
                            } catch (error) {
                                console.error("Error updating last_interaction_time:", error);
                            }

                            // Process the message as before
                            let messageData = {
                                whatsappUserId: from,
                                whatsappUserName: message.profile ? message.profile.name : null,
                                phoneNumberId: phoneNumberId,
                                messageId: message.id,
                                messageBody: message.text ? message.text.body : null,
                                timestamp: timestamp,
                                direction: 'incoming'
                            };

                            // Handle media messages
                            if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'document') {
                                const mediaId = message[message.type].id;
                                const mimeType = message[message.type].mime_type;
                                const caption = message.caption || null;

                                const mediaPath = await downloadMedia(mediaId, mimeType, process.env.CLIENT_NAME);

                                messageData = {
                                    ...messageData,
                                    mediaId: mediaId,
                                    mediaType: message.type,
                                    caption: caption,
                                    mimeType: mimeType,
                                    mediaPathUrl: mediaPath
                                };
                            }

                            // Handle location messages
                            if (message.location) {
                                messageData = {
                                    ...messageData,
                                    locationLatitude: message.location.latitude,
                                    locationLongitude: message.location.longitude,
                                    locationName: message.location.name,
                                    locationAddress: message.location.address
                                };
                            }

                            // Save message to database
                            try {
                                await WebhookMessage.create(messageData);
                                console.log("Message saved to WebhookMessage table");
                            } catch (error) {
                                console.error("Error saving message to WebhookMessage table:", error);
                            }
                        }
                    }

                    // Existing logic for statuses
                    if (value.statuses && value.statuses.length > 0) {
                        for (const status of value.statuses) {
                            const statusTimestamp = new Date(status.timestamp * 1000);
                            const recipientId = status.recipient_id;

                            const statusData = {
                                messageId: status.id,
                                recipientId: recipientId,
                                status: status.status,
                                timestamp: statusTimestamp,
                                conversationId: status.conversation ? status.conversation.id : null,
                                conversationCategory: status.conversation ? status.conversation.origin.type : null,
                                isBillable: status.pricing ? status.pricing.billable : false,
                                errorCode: status.errors ? status.errors[0].code : null,
                                errorTitle: status.errors ? status.errors[0].title : null,
                                errorMessage: status.errors ? status.errors[0].message : null,
                                errorDetails: status.errors ? status.errors[0].error_data.details : null,
                                direction: 'outgoing'
                            };

                            try {
                                const message = await WebhookMessage.findOne({
                                    where: {
                                        whatsappUserId: recipientId,
                                        messageId: status.id
                                    }
                                });

                                if (message) {
                                    statusData.messageId = message.messageId;
                                    await WebhookMessageStatus.create(statusData);
                                    console.log("Status saved to WebhookMessageStatus table");
                                } else {
                                    console.error("No matching message found for status update with recipient ID:", recipientId, "and message ID:", status.id);
                                }
                            } catch (error) {
                                console.error("Error saving status to WebhookMessageStatus table:", error);
                            }
                        }
                    }
                }
            }
        }

        return res.sendStatus(200);
    }

    console.log("Invalid webhook event received.");
    return res.sendStatus(404);
});


// webhookRoutes.post('/webhook', async (req, res) => {
//     const bodyParam = req.body;
//     console.log("Received webhook payload at:", new Date().toISOString());
//     console.log("Received webhook payload:", JSON.stringify(bodyParam, null, 2));

//     if (bodyParam.object === 'whatsapp_business_account') {
//         const entries = bodyParam.entry;

//         for (const entry of entries) {
//             const changes = entry.changes;

//             if (changes && changes.length > 0) {
//                 for (const change of changes) {
//                     const value = change.value;

//                     if (value.messages && value.messages.length > 0) {
//                         for (const message of value.messages) {
//                             const phoneNumberId = value.metadata.phone_number_id;
//                             const from = message.from; 
//                             const messageId = message.id;
//                             const timestamp = new Date(message.timestamp * 1000);

//                             const isSentByBusiness = from === process.env.WHATSAPP_BUSINESS_PHONE_NUMBER; // Your WhatsApp number

//                             if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'document') {
//                                 const mediaId = message[message.type].id;
//                                 const mimeType = message[message.type].mime_type;
//                                 const caption = message.caption || null;

//                                 const mediaPath = await downloadMedia(mediaId, mimeType, process.env.CLIENT_NAME);

//                                 const messageData = {
//                                     whatsappUserId: from,
//                                     whatsappUserName: message.profile ? message.profile.name : null,
//                                     phoneNumberId: phoneNumberId,
//                                     messageId: messageId,
//                                     messageBody: message.text ? message.text.body : null,
//                                     timestamp: timestamp,
//                                     mediaId: mediaId,
//                                     mediaType: message.type,
//                                     caption: caption,
//                                     mimeType: mimeType,
//                                     mediaPathUrl: mediaPath,
//                                     direction: isSentByBusiness ? 'outgoing' : 'incoming' 
//                                 };

//                                 try {
//                                     await WebhookMessage.create(messageData);
//                                     console.log("Message with media saved to WebhookMessage table");
//                                 } catch (error) {
//                                     console.error("Error saving message with media to WebhookMessage table:", error);
//                                 }
//                             } else {
//                                 const messageData = {
//                                     whatsappUserId: from,
//                                     whatsappUserName: message.profile ? message.profile.name : null,
//                                     phoneNumberId: phoneNumberId,
//                                     messageId: messageId,
//                                     messageBody: message.text ? message.text.body : null,
//                                     timestamp: timestamp,
//                                     direction: isSentByBusiness ? 'outgoing' : 'incoming' 
//                                 };

//                                 try {
//                                     await WebhookMessage.create(messageData);
//                                     console.log("Message saved to WebhookMessage table");
//                                 } catch (error) {
//                                     console.error("Error saving message to WebhookMessage table:", error);
//                                 }
//                             }
//                         }
//                     }

//                     // Handling message status updates
//                     if (value.statuses && value.statuses.length > 0) {
//                         for (const status of value.statuses) {
//                             const statusTimestamp = new Date(status.timestamp * 1000);
//                             const statusData = {
//                                 status: status.status,
//                                 timestamp: statusTimestamp,
//                                 recipientId: status.recipient_id,
//                                 conversationId: status.conversation ? status.conversation.id : null,
//                                 conversationCategory: status.conversation ? status.conversation.origin.type : null,
//                                 isBillable: status.pricing ? status.pricing.billable : false,
//                                 errorCode: status.errors ? status.errors[0].code : null,
//                                 errorTitle: status.errors ? status.errors[0].title : null,
//                                 errorMessage: status.errors ? status.errors[0].message : null,
//                                 errorDetails: status.errors ? status.errors[0].error_data.details : null,
//                             };

//                             try {
//                                 const message = await WebhookMessage.findOne({
//                                     where: {
//                                         whatsappUserId: status.recipient_id,
//                                         messageId: status.id
//                                     }
//                                 });

//                                 if (message) {
//                                     statusData.messageId = message.messageId;
//                                     await WebhookMessageStatus.create(statusData);
//                                     console.log("Status saved to WebhookMessageStatus table");
//                                 } else {
//                                     console.error("No matching message found for status update with recipient ID:", status.recipient_id, "and message ID:", status.id);
//                                 }
//                             } catch (error) {
//                                 console.error("Error saving status to WebhookMessageStatus table:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         return res.sendStatus(200);
//     }

//     console.log("Invalid webhook event received.");
//     return res.sendStatus(404);
// });


// Function to download media from WhatsApp API
// async function downloadMedia(mediaId, mimeType) {
//     try {
//         // Step 1: Retrieve the media URL
//         const mediaUrlResponse = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         const mediaUrl = mediaUrlResponse.data.url;

//         // Step 2: Download the media using the obtained URL
//         const mediaResponse = await axios.get(mediaUrl, {
//             responseType: 'arraybuffer',
//             headers: {
//                 Authorization: `Bearer ${token}`  // Pass token again for media URL
//             }
//         });

//         // Determine file extension from mime type
//         const extension = mimeType.split('/')[1];
//         const fileName = `media_${mediaId}.${extension}`;
//         const directoryPath = path.join(__dirname, '../media');

//         // Ensure directory exists
//         if (!fs.existsSync(directoryPath)) {
//             fs.mkdirSync(directoryPath, { recursive: true });
//         }

//         const filePath = path.join(directoryPath, fileName);

//         // Write media file to disk
//         fs.writeFileSync(filePath, mediaResponse.data);
//         console.log(`Media downloaded and saved as ${filePath}`);

//         return filePath;  // Return the file path to store in the database
//     } catch (error) {
//         console.error("failed to download media :::>>>>", error);
//         console.error("Error downloading media:", error.message);
//         return null;
//     }
// }

const downloadMedia = async (mediaId, mimeType, clientName) => {
    try {
        const mediaUrlResponse = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const mediaUrl = mediaUrlResponse.data.url;

        const mediaResponse = await axios.get(mediaUrl, {
            responseType: 'arraybuffer',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const extension = mimeType.split('/')[1];
        const clientName = process.env.CLIENT_NAME || 'default_client';

        const fileKey = `${clientName}/whatsApp_media/${uuidv4()}.${extension}`;

        const params = {
            Bucket: 'real_estate', 
            Key: fileKey,  
            Body: mediaResponse.data,
            ACL: 'public-read',
            ContentType: mimeType,
        };

        const uploadResult = await s3.upload(params).promise();

        const mediaUrlInSpace = uploadResult.Location;
        console.log(`Media uploaded and available at ${mediaUrlInSpace}`);

        return mediaUrlInSpace;  

    } catch (error) {
        console.error("Error downloading or uploading media:", error);
        return null;
    }
};

webhookRoutes.get('/conversation/:whatsappUserId', whatsAppWebhookController.fetchConversation);

webhookRoutes.post('/sendText', whatsAppWebhookController.sendTextMessage);

webhookRoutes.post('/sendMedia', upload.single('media'), whatsAppWebhookController.sendMediaMessage);


module.exports = webhookRoutes;

