const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
const { Users } = require('../models');
const PropertyTypes = require('../models/propertyTypesModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');

const addPropertyType = async (id, propertyType) => {
    try {
        const requester = await Users.findByPk(id);

        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }

        const newPropertyType = await PropertyTypes.create({ propertyType })
        return newPropertyType;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

const getAllPropertyTypes = async ()=>{
    try {
        const properties = await PropertyTypes.findAll();
        return properties;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

const assignPropertyTypesToUser = async (userId, propertyTypeIds) => {
    try {
        const interests = propertyTypeIds.map((propertyTypeId) => ({
            userId,
            propertyTypeId,
        }));

        const assignedProperties = await UserPropertyInterests.bulkCreate(interests);

        return assignedProperties;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};

;


module.exports = {
    addPropertyType,
    getAllPropertyTypes,
    assignPropertyTypesToUser,
}