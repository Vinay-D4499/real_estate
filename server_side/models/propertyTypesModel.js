const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const PropertyTypes = sequelize.define('PropertyTypes', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    }
}, {
    timestamps: false,
    tableName: 'PropertyTypes'
});

module.exports = PropertyTypes;
