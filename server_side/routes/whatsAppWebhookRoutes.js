const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const WebhookMessage = require('../models/webhookMessageModel');
const WebhookMessageStatus = require('../models/webhookMessageStatusModel');
const { Op } = require('sequelize');
const webhookRoutes = express.Router();

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

                    // Handling incoming messages
                    if (value.messages && value.messages.length > 0) {
                        for (const message of value.messages) {
                            const phoneNumberId = value.metadata.phone_number_id;
                            const from = message.from;
                            const messageId = message.id;
                            const timestamp = new Date(message.timestamp * 1000);

                            // Check if the message contains media
                            if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'document') {
                                const mediaId = message[message.type].id;
                                const mimeType = message[message.type].mime_type;
                                const caption = message.caption || null;

                                // Attempt to download and save the media
                                const mediaPath = await downloadMedia(mediaId, mimeType);

                                const messageData = {
                                    whatsappUserId: from,
                                    whatsappUserName: message.profile ? message.profile.name : null,
                                    phoneNumberId: phoneNumberId,
                                    messageId: messageId,
                                    messageBody: message.text ? message.text.body : null,
                                    timestamp: timestamp,
                                    mediaId: mediaId,
                                    mediaType: message.type,
                                    caption: caption,
                                    mimeType: mimeType,
                                    mediaPath: mediaPath 
                                };

                                try {
                                    await WebhookMessage.create(messageData);
                                    console.log("Message with media saved to WebhookMessage table");
                                } catch (error) {
                                    console.error("Error saving message with media to WebhookMessage table:", error);
                                }
                            } else {
                                // Handle messages without media as usual
                                const messageData = {
                                    whatsappUserId: from,
                                    whatsappUserName: message.profile ? message.profile.name : null,
                                    phoneNumberId: phoneNumberId,
                                    messageId: messageId,
                                    messageBody: message.text ? message.text.body : null,
                                    timestamp: timestamp
                                };

                                try {
                                    await WebhookMessage.create(messageData);
                                    console.log("Message saved to WebhookMessage table");
                                } catch (error) {
                                    console.error("Error saving message to WebhookMessage table:", error);
                                }
                            }
                        }
                    }

                    // Handling message status updates
                    if (value.statuses && value.statuses.length > 0) {
                        for (const status of value.statuses) {
                            const statusTimestamp = new Date(status.timestamp * 1000);
                            const statusData = {
                                status: status.status,
                                timestamp: statusTimestamp,
                                recipientId: status.recipient_id,
                                conversationId: status.conversation ? status.conversation.id : null,
                                conversationCategory: status.conversation ? status.conversation.origin.type : null,
                                isBillable: status.pricing ? status.pricing.billable : false,
                                errorCode: status.errors ? status.errors[0].code : null,
                                errorTitle: status.errors ? status.errors[0].title : null,
                                errorMessage: status.errors ? status.errors[0].message : null,
                                errorDetails: status.errors ? status.errors[0].error_data.details : null,
                            };

                            try {
                                const message = await WebhookMessage.findOne({
                                    where: {
                                        whatsappUserId: status.recipient_id,
                                        messageId: status.id
                                    }
                                });

                                if (message) {
                                    statusData.messageId = message.messageId;
                                    await WebhookMessageStatus.create(statusData);
                                    console.log("Status saved to WebhookMessageStatus table");
                                } else {
                                    console.error("No matching message found for status update with recipient ID:", status.recipient_id, "and message ID:", status.id);
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

// Function to download media from WhatsApp API
async function downloadMedia(mediaId, mimeType) {
    try {
        const mediaUrlResponse = await axios.get(`https://graph.facebook.com/v20.0/${mediaId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const mediaUrl = mediaUrlResponse.data.url;
        const mediaResponse = await axios.get(mediaUrl, { responseType: 'arraybuffer' });

        // Determine file extension from mime type
        const extension = mimeType.split('/')[1];
        const fileName = `media_${mediaId}.${extension}`;
        const filePath = path.join(__dirname, '../media', fileName);

        // Write media file to disk
        fs.writeFileSync(filePath, mediaResponse.data);
        console.log(`Media downloaded and saved as ${filePath}`);

        return filePath;  // Return the file path to store in the database
    } catch (error) {
        console.error(error)
        console.error("Error downloading media:", error.message);
        return null;
    }
}

module.exports = webhookRoutes;
