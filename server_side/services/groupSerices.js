const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
const { Users } = require('../models');
const groupTypes = require('../models/groupModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');
const Admin  = require('../models/adminModel');
const Groups = require('../models/groupModel');

const createGroup = async (userData) => {
    try {
        
        // const requester = await Admin.findByPk(id);
        // console.log(id);

        // if (!requester) {
        //     throw new ForbiddenError('Access Forbidden');
        // }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }
   

        const newGroup = await Groups.create(userData);
        return newGroup;
    } catch (error) {
        console.log("Error creating user ==>", error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BadRequestError('An Account Exists with the given credentials.');
        }
        throw new InternalServerError('Failed to create user');
    }
};

const getAllGroups = async ()=>{
    try {
        const getAllGroups = await groupTypes.findAll();
        return getAllGroups;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

// const assignPropertyTypesToUser = async (userId, propertyTypeIds) => {
//     try {
//         const interests = propertyTypeIds.map((propertyTypeId) => ({
//             userId,
//             propertyTypeId,
//         }));

//         const assignedProperties = await UserPropertyInterests.bulkCreate(interests);

//         return assignedProperties;
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         throw error;
//     

//delete a group

const deleteGroup = async (groupId) => {

    // Find the group by ID
    const group = await Groups.findOne({
        where: {
            groupId: groupId,
        },
    });
  
    if (!group) {
        return null; // Property not found
    }

    // Delete the property
    await group.destroy();
    console.log(`  deleted ${Groups.group} successfully...`);

    // // Delete user property interests associated with the deleted property
    // await UserPropertyInterests.destroy({
    //     where: {
    //         propertyTypeId: propertyId,
    //     },

    

    return true; // Indicate successful deletion
};


const editGroup = async (requesterId, groupData) => {
    try {
        // const requester = await Admin.findByPk(requesterId);
        // if (!requester) {
        //     throw new ForbiddenError('Access Forbidden');
        // }

        const groupToUpdate = await Groups.findByPk(requesterId);
        if (!groupToUpdate) {
            throw new NotFoundError('Group to update not found');
        }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }

        const updatedGroup = await groupToUpdate.update(groupData);
        return updatedGroup;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

module.exports = {
    createGroup,
    getAllGroups,
    deleteGroup,
    editGroup
}