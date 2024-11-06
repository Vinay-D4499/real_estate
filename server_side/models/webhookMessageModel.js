const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const Users = require('./userModel'); 

const WebhookMessage = sequelize.define('WebhookMessage', {
    whatsappUserId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    whatsappUserName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumberId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    messageId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    messageBody: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reactionEmoji: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    caption: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mediaPathUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    locationLatitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    locationLongitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    locationName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    locationAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    buttonText: {
        type: DataTypes.STRING,
        allowNull: true
    },
    buttonPayload: {
        type: DataTypes.STRING,
        allowNull: true
    },
    errorCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    errorDetails: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true,
    tableName: 'WebhookMessages'
});



module.exports = WebhookMessage;
