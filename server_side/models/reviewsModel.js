const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Reviews = sequelize.define('Reviews', {
   
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5 // Ratings typically range from 1 to 5
        }
    },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: true // Some users may leave a rating without text
    },
    review_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    review_type: {
        type: DataTypes.ENUM('PRODUCT', 'SERVICE', 'OTHER'),
        allowNull: false,
        defaultValue: 'OTHER' // Default type for unspecified reviews
    },
    
    helpful_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
   
}, {
    timestamps: true, // Adds createdAt and updatedAt
    tableName: 'Reviews'
});

module.exports = Reviews;
