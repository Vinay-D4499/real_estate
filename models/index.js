const { sequelize, createDatabaseIfNotExists } = require('../config/dbConfig');

//import the created models here in order to create table in the database 
const Users = require('./userModel');
const Admin = require('./adminModel');
const PropertyTypes = require('./propertyTypesModel');
const UserPropertyInterests = require('./userPropertyInterestsModel');
const WebhookMessage = require('./webhookMessageModel');
const WebhookMessageStatus = require('./webhookMessageStatusModel');
const Reviews = require('./reviewsModel');
<<<<<<< HEAD
const Groups = require('./groupModel');
const GroupUser = require('./groupUserModel');
=======
>>>>>>> 3ef6de2d9bd33a79c317da5a2d97f6891c116ae3


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

<<<<<<< HEAD
Users.belongsToMany(Groups, {
  through: GroupUser,
  foreignKey: 'userId'
});
Groups.belongsToMany(Users, {
  through: GroupUser,
  foreignKey: 'groupId'
});


=======
>>>>>>> 3ef6de2d9bd33a79c317da5a2d97f6891c116ae3

// Users and Reviews association with cascading delete and update
Users.hasMany(Reviews, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Reviews.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

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
};
