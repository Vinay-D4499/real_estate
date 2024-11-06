// src/models/Users.js
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
        defaultValue: 'CUSTOMER'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    // whatsappUserId: { 
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //     unique: true
    // }
}, {
    timestamps: true,
    tableName: 'Users'
});



module.exports = Users;
