const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const WebhookMessage = require("./webhookMessageModel");

const WebhookMessageStatus = sequelize.define('WebhookMessageStatus', {
    statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    messageId: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    recipientId: { 
        type: DataTypes.STRING, 
        allowNull: false,
        references: {
            model: WebhookMessage,
            key: 'whatsappUserId'  
        }
    },
    status: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false },
    conversationId: { type: DataTypes.STRING },
    conversationCategory: { type: DataTypes.STRING },
    isBillable: { type: DataTypes.BOOLEAN, defaultValue: false },
    errorCode: { type: DataTypes.INTEGER },
    errorTitle: { type: DataTypes.STRING },
    errorMessage: { type: DataTypes.STRING },
    errorDetails: { type: DataTypes.STRING },
}, {
    timestamps: true,
    tableName: 'WebhookMessageStatuses'
});


module.exports = WebhookMessageStatus;
