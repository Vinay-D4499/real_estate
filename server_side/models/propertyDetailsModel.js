const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const PropertyDetails = sequelize.define('PropertyDetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    property_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    property_type_id: {  // Adding a property_type_id foreign key to link PropertyDetails with PropertyTypes
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    property_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    property_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    property_maplocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    property_sq_feets_or_length: {
        type: DataTypes.STRING,
        allowNull: true
    },
    property_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
  
}, {
    tableName: 'PropertyDetails',
    timestamps: true // enables createdAt and updatedAt
});

module.exports = PropertyDetails;
