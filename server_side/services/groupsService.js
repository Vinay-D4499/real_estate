const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
const { Users } = require('../models');
const { groups } = require('../models/groupsModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');

const addGroupType = async (groupId, groupType) => {
    try {
        const requester = await groupType.findByPk(groupId);

        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }

        const newgroup = await groups.create({ groupType })
        return newgroup;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
} ;


module.exports = {
    addGroupType,

}