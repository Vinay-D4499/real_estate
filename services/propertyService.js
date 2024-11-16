const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
// const { Admins } = require('../models/adminModel');
const PropertyTypes = require('../models/propertyTypesModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');
const Admins = require('../models/adminModel');


const addPropertyType = async (id, propertyType) => {
    try {
        console.log(id,"id====>");
        console.log(propertyType , "=====>p");
       const requester = await Admins.findOne({
    where: {
        id: id
    }
    });
        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

         // Ensure propertyType is a valid string
         if (!propertyType || typeof propertyType !== 'string') {
            throw new Error('PropertyType must be a string.');
        }

        const newPropertyType = await PropertyTypes.create({ name: propertyType });
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

const deleteProperty = async (propertyId) => {

    // Find the property by ID
    const property = await PropertyTypes.findOne({
        where: {
            id: propertyId,
        },
    });
  
    if (!property) {
        return null; // Property not found
    }

    // Delete the property
    await property.destroy();
    console.log("Property deleted successfully...");

    // Delete user property interests associated with the deleted property
    await UserPropertyInterests.destroy({
        where: {
            propertyTypeId: propertyId,
        },
    });

    return true; // Indicate successful deletion
};


module.exports = {
    addPropertyType,
    getAllPropertyTypes,
    assignPropertyTypesToUser,
    deleteProperty,
}