const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
const { Users } = require('../models');
const PropertyTypes = require('../models/propertyTypesModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');

const addPropertyType = async (id, propertyType) => {
    try {
        console.log(id,"-------------------------------------------id service");
        const requester = await Admin.findByPk(id);
          console.log(requester , "requester===================================> service")
        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }

        const newPropertyType = await PropertyTypes.create({ propertyType })
        console.log(newPropertyType, "====================================>newPropertyType");
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