const groupServices = require('../services/groupService');

const groupType = async (req,res, next)=>{
    try {
        const groupID = req.user;
        const {groupType} = req.body;
        const group = await groupServices.groupType(groupID,{groupType});

        return res.status(201).json({ message: 'Group added successfully', group: group });

    } catch (error) {
        next();
    }
} ;

module.exports = {
    groupType
}
