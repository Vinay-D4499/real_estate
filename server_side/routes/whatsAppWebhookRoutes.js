const express = require('express');
const WebhookMessage = require('../models/webhookMessageModel');
const WebhookMessageStatus = require('../models/webhookMessageStatusModel');
const { Op } = require('sequelize');
const webhookRoutes = express.Router();


const token = process.env.WHATSAPP_TOKEN;
const mytoken = process.env.CHECK_TOKEN;

webhookRoutes.get('/webhook', (req, res) => {
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];


    if (mode && token) {

        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challange);
        } else {
            res.status(403);
        }

    }
})

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

                            const messageData = {
                                whatsappUserId: from,
                                whatsappUserName: message.profile ? message.profile.name : null,
                                phoneNumberId: phoneNumberId,
                                messageId: messageId,
                                messageBody: message.text ? message.text.body : null,
                                timestamp: timestamp,
                                reactionEmoji: message.reaction ? message.reaction.emoji : null,
                                mediaId: message.media ? message.media.id : null,
                                mediaType: message.media ? message.media.type : null,
                                caption: message.caption || null,
                                mimeType: message.media ? message.media.mime_type : null,
                                locationLatitude: message.location ? message.location.latitude : null,
                                locationLongitude: message.location ? message.location.longitude : null,
                                locationName: message.location ? message.location.name : null,
                                locationAddress: message.location ? message.location.address : null,
                                buttonText: message.button ? message.button.text : null,
                                buttonPayload: message.button ? message.button.payload : null,
                                errorCode: message.errors ? message.errors[0].code : null,
                                errorDetails: message.errors ? message.errors[0].details : null,
                            };

                            try {
                                await WebhookMessage.create(messageData);
                                console.log("Message saved to WebhookMessage table");
                            } catch (error) {
                                console.error("Error saving message to WebhookMessage table:", error);
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
                    
                            console.log("Status Data to be saved:", statusData);
                    
                            try {
                                const message = await WebhookMessage.findOne({
                                    where: {
                                        whatsappUserId: status.recipient_id,
                                        messageId: status.id  
                                    }
                                });
                    
                                if (message) {
                                    statusData.messageId = message.messageId;
                                    
                                    // Additional logging before attempting to save
                                    console.log("Saving to WebhookMessageStatus with statusData:", statusData);
                                    
                                    await WebhookMessageStatus.create(statusData);
                                    console.log("Status successfully saved to WebhookMessageStatus table");
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

module.exports = webhookRoutes;