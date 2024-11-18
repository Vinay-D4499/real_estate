const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
 const { Admins,User,Groups } = require('../models');
const PropertyTypes = require('../models/propertyTypesModel');
const UserGroups = require('../models/groupUserModel');
//const Admins = require('../models/adminModel');
const GroupUser = require('../models/groupUserModel');
const { findUserById } = require('../controllers/userController');




const assignGroupToUser = async (userId, groupIds) => {
  try {
      const interests = groupIds.map((groupId) => ({
          userId,
          groupId,
      }));

      const assignedGroups = await GroupUser.bulkCreate(interests);

      return assignedGroups;
  } catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500;
      }
      throw error;
  }
};




const addUserToGroup = async (userId, groupId) => {
    try {
        const group = await Groups.findByPk(groupId);
        if (!group) throw new Error('Group not found');

        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        await group.addUser(user);
        return { message: 'User added to group successfully' };
    } catch (error) {
        throw error;
    }
};


const getGroupsForUser = async (userId) => {
  try {
      const user = await User.findByPk(userId, {
          include: Groups,
      });
      if (!user) throw new Error('User not found');

      return user.Groups; // List of associated groups
  } catch (error) {
      throw error;
  }
};

const getUsersForGroup = async (groupId) => {
  try {
      const group = await Groups.findByPk(groupId, {
          include: User,
      });
      if (!group) throw new Error('Group not found');

      return group.Users; // List of associated users
  } catch (error) {
      throw error;
  }
};

module.exports = {
    assignGroupToUser,
    addUserToGroup,
    getGroupsForUser,
    getUsersForGroup,

}