const groupServices = require('../services/groupSerices');
const groupUserServices = require('../services/groupUserService');
const middlewares = require('../middlewares/authMiddleware');
const { Users, Admin } = require('../models');


const createGroup = async (req,res, next)=>{
    try {
      //  const id = req.user;
        const {groupId,groupName,groupType,groupDescr} = req.body;
        const group = await groupServices.createGroup({groupId,groupName,groupType,groupDescr});

        return res.status(201).json({ message: 'Group added successfully', group: group });

    } catch (error) {
        next();
    }
    
}

const getAllGroups = async (req, res, next)=>{
    try{
    //const id = req.user;
    const groups = await groupServices.getAllGroups();

    return res.status(200).json({message : 'Fetched All Groups', groups : groups})
}
catch(error)
{
    next();
}
}
const assignGroupToUser = async (req, res, next) => {
    const { userId, groupIds } = req.body; 

    if (!userId || !groupIds || !Array.isArray(groupIds)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const assignedGroups = await groupUserServices.assignGroupToUser(userId, groupIds);
        return res.status(201).json({ message: 'Assigned Group  to user successfully', assignedGroups });
    } catch (error) {
        next(error);
    }
};


const deleteGroup = async (req, res, next) => {
    const { id } = req.params; 
    console.log(`Attempting to delete Group with ID: ${id}`);//Group ID from URL params
    
    try {
       
        // Call the service method to delete the property by ID and user ID
        const result = await groupServices.deleteGroup(id);
        console.log(`${result}`)

        if (result) {
            return res.status(200).json({ message: 'Group deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Group not found' });
        }
    } catch (error) {
        next(error); // Pass the error to error handling middleware
    }
};

const editGroup = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return next(new BadRequestError('Validation failed'));
    // }

    const {id} = req.params; 
    //const requesterId = req.user; 

    const {
        groupName,
        groupType,
        groupDescr,
        
    } = req.body;

    try {

        const updateGroup = await groupServices.editGroup( id, {
        groupName,
        groupType,
        groupDescr,
        });

        return res.status(200).json({ message: 'Group updated successfully', group: updateGroup });
    } catch (error) {
        console.log("errr")
        next(error);
    }
}
const addUserToGroupController = async (req, res) => {
    const { userId, groupId } = req.body;
    try {
        const result = await addUserToGroup(userId, groupId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getGroupsForUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const groups = await getGroupsForUser(userId);
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getUsersForGroupController = async (req, res) => {
    const { groupId } = req.params;
    try {
        const users = await getUsersForGroup(groupId);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createGroup,
    getAllGroups,
    assignGroupToUser,
    deleteGroup,
    editGroup,
    addUserToGroupController,
    getGroupsForUserController,
    getUsersForGroupController,
}