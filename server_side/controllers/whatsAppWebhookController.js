const webhookService = require('../services/whatsAppWebHookService');

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


module.exports = {
    fetchConversation,
    sendTextMessage,
    sendMediaMessage
};
