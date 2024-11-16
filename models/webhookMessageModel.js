const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const WebhookMessage = sequelize.define('WebhookMessage', {
    whatsappUserId: { type: DataTypes.STRING, allowNull: false },
    whatsappUserName: { type: DataTypes.STRING },
    phoneNumberId: { type: DataTypes.STRING, allowNull: false },
    messageId: { type: DataTypes.STRING, allowNull: false, primaryKey: true }, 
    messageBody: { type: DataTypes.TEXT },
    timestamp: { type: DataTypes.DATE, allowNull: false },
    reactionEmoji: { type: DataTypes.STRING },
    mediaId: { type: DataTypes.STRING },
    mediaType: { type: DataTypes.STRING },
    caption: { type: DataTypes.TEXT },
    mimeType: { type: DataTypes.STRING },
    mediaPathUrl: { type: DataTypes.STRING },
    direction: { type: DataTypes.STRING },
    locationLatitude: { type: DataTypes.FLOAT },
    locationLongitude: { type: DataTypes.FLOAT },
    locationName: { type: DataTypes.STRING },
    locationAddress: { type: DataTypes.STRING },
    buttonText: { type: DataTypes.STRING },
    buttonPayload: { type: DataTypes.STRING },
    errorCode: { type: DataTypes.INTEGER },
    errorDetails: { type: DataTypes.STRING },
});

module.exports = WebhookMessage;