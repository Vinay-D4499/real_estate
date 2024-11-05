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

module.exports = {
    fetchConversation,
};
