const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Users = sequelize.define('Users', {
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    phone : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    role: {
        type: DataTypes.ENUM('SUPER ADMIN','ADMIN','CUSTOMER'),
        allowNull: false,
        defaultValue: 'CUSTOMER'  // CUSTOMER WILL BE THE DEFAULT ROLE
    },    
},{
    timestamps : true, //createdAt and updatedAt
    tableName : 'Users'
})

module.exports = Users;