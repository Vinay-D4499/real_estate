const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const UserPropertyDetails = sequelize.define('UserPropertyDetails', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
       
    }
}, {
    timestamps: true,
    tableName: 'UserPropertyDetails'
});

module.exports = UserPropertyDetails;
