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
        const accessToken = process.env.WHATSAPP_TOKEN; // Your WhatsApp API token
        const businessId = process.env.BUSINESS_ID; // Your business account ID

        // Template payload
        const templateData = {
            name: "for_testing_purpose", // Template name
            category: "UTILITY", // Template category
            allow_category_change: true, // Allow category reassignment
            language: "en_US", // Language and locale code
            components: [
                {
                    type: "BODY", // Text body with placeholders
                    text: "Welcome to Lara Technologies! We are a premier Java Full-Stack Training Institute located in Bengaluru. Visit our website at https://lara.co.in for more information. Let us know if you are interested in starting your journey with us!",
                },
                {
                    type: "BUTTONS", // Action buttons
                    buttons: [
                        {
                            type: "QUICK_REPLY", // Button for user interaction
                            text: "I'm Interested", // Button text
                        },
                        {
                            type: "QUICK_REPLY", // Button for deferring interest
                            text: "Maybe Later", // Button text
                        },
                    ],
                },
            ],
        };

        // API request to create the template
        const response = await axios.post(
            `https://graph.facebook.com/v21.0/${businessId}/message_templates`,
            templateData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Template created successfully:", response.data);
        return res.status(200).json({ message: "Template created successfully", data: response.data });
    } catch (error) {
        console.error("Error creating template:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Failed to create template", details: error.response?.data });
    }
};

const checkTemplateStatus = async (req, res) => {
    try {
        const { templateName } = req.body; // Expecting the template name in the request body
        const accessToken = process.env.WHATSAPP_TOKEN; // WhatsApp API token
        const businessId = process.env.BUSINESS_ID; // WhatsApp Business Account ID

        // API request to fetch all message templates
        const response = await axios.get(
            `https://graph.facebook.com/v21.0/${businessId}/message_templates`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // Search for the template by name
        const template = response.data.data.find((tmpl) => tmpl.name === templateName);

        if (template) {
            // Template found, return its status
            return res.status(200).json({
                success: true,
                message: `Template "${templateName}" found.`,
                status: template.status,
            });
        } else {
            // Template not found
            return res.status(404).json({
                success: false,
                message: `Template "${templateName}" not found.`,
            });
        }
    } catch (error) {
        console.error("Error checking template status:", error.response ? error.response.data : error.message);

        // Handle errors and send appropriate response
        return res.status(500).json({
            success: false,
            message: "Failed to check template status.",
            error: error.response?.data || error.message,
        });
    }
};


module.exports = {
    fetchConversation,
    sendTextMessage,
    sendMediaMessage,
    createWhatsAppTemplate,
    checkTemplateStatus
};
