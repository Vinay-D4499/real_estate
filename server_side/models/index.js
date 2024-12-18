const { sequelize, createDatabaseIfNotExists } = require('../config/dbConfig');

//import the created models here in order to create table in the database 
const Users = require('./userModel');
const Admin = require('./adminModel');
const PropertyTypes = require('./propertyTypesModel');
const UserPropertyInterests = require('./userPropertyInterestsModel');
const WebhookMessage = require('./webhookMessageModel');
const WebhookMessageStatus = require('./webhookMessageStatusModel');
const Reviews = require('./reviewsModel');
const PropertyDetails = require('./propertyDetailsModel');
const PropertyMedia = require('./propertyMedia');
const UserPropertyDetails = require('./userPropertyDetails')
const Groups = require('./groupModel');
const GroupUser = require('./groupUserModel');

//Associations 
Users.belongsToMany(PropertyTypes, {
  through: UserPropertyInterests,
  foreignKey: 'userId'
});
PropertyTypes.belongsToMany(Users, {
  through: UserPropertyInterests,
  foreignKey: 'propertyTypeId'
});

// WebhookMessage.hasMany(WebhookMessageStatus, { foreignKey: 'messageId', sourceKey: 'messageId' });
// WebhookMessageStatus.belongsTo(WebhookMessage, { foreignKey: 'messageId', targetKey: 'messageId' });

WebhookMessage.hasMany(WebhookMessageStatus, {
  foreignKey: 'messageId',
  sourceKey: 'messageId',
  as: 'statuses'
});

WebhookMessageStatus.belongsTo(WebhookMessage, {
  foreignKey: 'messageId',
  targetKey: 'messageId',
  as: 'message'
});


// Users and Reviews association with cascading delete and update
Users.hasMany(Reviews, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Reviews.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


// Define associations
PropertyDetails.belongsTo(PropertyTypes, { foreignKey: 'property_type_id', as: 'propertyType' });
PropertyTypes.hasMany(PropertyDetails, { foreignKey: 'property_type_id', as: 'propertyDetails' });

// Associations
PropertyDetails.hasMany(PropertyMedia, {
  foreignKey: 'propertyDetails_id', // Ensure 'property_id' exists in PropertyMedia
  as: 'media',               // Alias should be consistent in both association and query
  onDelete: 'CASCADE'
});

PropertyMedia.belongsTo(PropertyDetails, {
  foreignKey: 'propertyDetails_id',
  as: 'property'
});

UserPropertyDetails.belongsTo(PropertyDetails, { foreignKey: 'property_id', targetKey: 'id' });
PropertyDetails.hasMany(UserPropertyDetails, { foreignKey: 'property_id', sourceKey: 'id' });

Users.belongsToMany(Groups, {
  through: GroupUser,
  foreignKey: 'userId'
});
Groups.belongsToMany(Users, {
  through: GroupUser,
  foreignKey: 'groupId'
});

const initDatabase = async () => {
  try {
    // Creates the database if it doesn't exist
    await createDatabaseIfNotExists();

    // Sync all models  with the database and the models present in the code 
    await sequelize.sync({ alter: false });  //this {alter : true} will add newly added column to the table without dropping them 

    console.log('Database and tables created successfully!');
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  initDatabase,
  Users,
  Admin,
  PropertyTypes,
  UserPropertyInterests,
  Reviews,
  PropertyDetails,
};
