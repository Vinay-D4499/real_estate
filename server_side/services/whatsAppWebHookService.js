const { sequelize } = require('../models');
const WebhookMessage = require('../models/webhookMessageModel');
const WebhookMessageStatus = require('../models/webhookMessageStatusModel');

async function getConversationByWhatsappUserId(whatsappUserId) {
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
            order: [['timestamp', 'ASC']],
        });

        return messages;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw error;
    }
}


module.exports = {
    getConversationByWhatsappUserId,
};
