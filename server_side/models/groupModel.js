const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Groups = sequelize.define('Groups', {
    groupId: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    groupType: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:false
    },
    groupDescr: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
     {
    timestamps: false,
    tableName: 'Groups'
});

module.exports = Groups;
