const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Users = sequelize.define('Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    budget_min: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    budget_max: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    brief_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    referred_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('CUSTOMER'),
        allowNull: false,
        defaultValue: 'CUSTOMER' // CUSTOMER will be the default role
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Set default to true
    },
    last_interaction_time: {
        type: DataTypes.DATE,
        allowNull: true, // Optional, can be null
    }
}, {
    timestamps: true,
    tableName: 'Users'
});

module.exports = Users;


// ALTER TABLE real_estate.users
// ADD COLUMN last_interaction_time DATETIME NULL;

// ALTER TABLE real_estate.users
// ADD COLUMN brief_description VARCHAR(255) DEFAULT NULL;
