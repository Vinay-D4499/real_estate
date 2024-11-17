const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const PropertyMedia = sequelize.define('PropertyMedia', {
    propertymedia_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    propertymedia_img: {  // Column for storing image URLs
        type: DataTypes.STRING,
        allowNull: true
    },
    propertymedia_video: {  // Column for storing video URLs
        type: DataTypes.STRING,
        allowNull: true
    },
    propertyDetails_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'PropertyDetails', // Name of the target model
            key: 'id'  // Key in the target model that this foreign key references
        },
        onDelete: 'CASCADE' 
       
    }  
}, {
    tableName: 'PropertyMedia',
    timestamps: true  // Optional: includes createdAt and updatedAt
});

module.exports = PropertyMedia;
