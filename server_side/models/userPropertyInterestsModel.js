const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const UserPropertyInterests = sequelize.define('UserPropertyInterests', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    propertyTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PropertyTypes',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'UserPropertyInterests'
});

module.exports = UserPropertyInterests;
