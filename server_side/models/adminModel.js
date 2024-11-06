const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Admins = sequelize.define('Admins', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true,
    tableName: 'Admins'
});

var a = 123;
module.exports = Admins;
module.exports = a;