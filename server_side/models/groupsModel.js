const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Groups = sequelize.define('Groups', {
    groupID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    groupType: {
        type: DataTypes.STRING,
        allowNull: true
    },
 
    groupDescr: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'Groups'
});

module.exports = Groups;
