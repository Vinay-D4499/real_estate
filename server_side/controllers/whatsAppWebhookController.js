const webhookService = require('../services/whatsAppWebHookService');
const axios = require('axios');
require('dotenv').config();
const moment = require("moment-timezone");
const currentDateTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");



async function fetchConversation(req, res) {
    const { whatsappUserId } = req.params;

    try {
        const conversation = await webhookService.getConversationByWhatsappUserId(whatsappUserId);
        
        if (!conversation) {
            return res.status(404).json({ message: 'No conversation found for this WhatsApp User ID' });
        }

        return res.status(200).json(conversation);
    } catch (error) {
        console.error("Error in fetchConversation controller:", error);
        return res.status(500).json({ message: 'Failed to fetch conversation', error: error.message });
    }
}

/**
 * Controller to send a text message and save it to the database.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function sendTextMessage(req, res) {
    const { to, body } = req.body;
    try {
        const result = await webhookService.sendTextMessage(to, body);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

/**
 * Controller to send a media message, upload media to DigitalOcean, and save it to the database.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
async function sendMediaMessage(req, res) {
    const { to, caption } = req.body;
    const mediaFile = req.file;

    if (!to || !mediaFile) {
        return res.status(400).json({ error: 'Phone number and media file are required' });
    }
    
    try {
        // Upload and send media through WhatsApp
        const result = await webhookService.sendMediaMessage(to, mediaFile, caption);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



const createWhatsAppTemplate = async (req, res) => {
    try {
        const accessToken = process.env.WHATSAPP_TOKEN;
        const businessId = process.env.BUSINESS_ID;
        console.log("business id ", businessId)

        // Define the template payload
        const currentDateTime = new Date().toLocaleString("en-US", { timeZone: "UTC" });
         console.log(currentDateTime)
        const templateData = {
            name: "lara_tech_java_fullstack",
            language: { code: "en_US" },
            components: [
                {
                    type: "HEADER",
                    format: "TEXT",
                    text: "Welcome to Lara Technologies!"
                },
                {
                    type: "BODY",
                    text: `Join our Java Full Stack Development course to kickstart your IT career. Enhance your skills with expert guidance and practical projects.`
                },
                {
                    type: "FOOTER",
                    text: "Contact us for more information."
                },
                {
                    type: "BUTTONS",
                    buttons: [
                        {
                            type: "QUICK_REPLY",
                            text: "ENROLL NOW"
                        },
                        {
                            type: "QUICK_REPLY",
                            text: "MORE INFO"
                        }
                    ]
                }
            ],
            category: "UTILITY"
        };
        

        // Make a POST request to Meta's Graph API
        const response = await axios.post(
            `https://graph.facebook.com/v20.0/${businessId}/message_templates`,
            templateData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("business id sent to facebook :", businessId)
        console.log("Template Created:", response.data);

        // Return success response
        return res.status(200).json({ message: "WhatsApp template created successfully", data: response.data });
    } catch (error) {
        console.error("Error Creating Template:", error.response ? error.response.data : error.message);
        console.error("Error", error)

        // Return error response
        return res.status(500).json({ error: "Failed to create WhatsApp template", details: error.response ? error.response.data : error.message });
    }
};

module.exports = {
    fetchConversation,
    sendTextMessage,
    sendMediaMessage,
    createWhatsAppTemplate,
};
