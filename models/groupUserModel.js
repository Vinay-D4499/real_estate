// GroupUser.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const GroupUser = sequelize.define('GroupUser', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Groups',
            key: 'groupId'
        }
    }
}, {
    timestamps: false,
    tableName: 'GroupUser'
});



// const GroupUser = sequelize.define('GroupUser', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'Users',
//             key: 'id'
//         },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//     },
//     groupId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'Groups',
//             key: 'id'
//         },
//         onDelete: 'CASCADE',
//         onUpdate: 'CASCADE'
//     }
// }, {
//     timestamps: true,
//     uniqueKeys: {
//         unique_tag: {
//             fields: ['userId', 'groupId']  // Enforces unique pairing of userId and groupId
//         }
//     }
// });
//sequelize.sync({force:true});
module.exports = GroupUser;



