const { NotFoundError, ForbiddenError } = require('../errors/httpErrors');
// const { Admins } = require('../models/adminModel');
const PropertyTypes = require('../models/propertyTypesModel');
const UserPropertyInterests = require('../models/userPropertyInterestsModel');
const Admins = require('../models/adminModel');
const Users = require('../models/userModel');

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

const addPropertyTypetouser = async (propertyTypeId,userId) => {
    try {
        console.log(userId,"id====>");
        console.log(propertyTypeId , "=====>p");
      

         // Ensure propertyType is a valid string
         if (!userId ) {
            throw new Error('PropertyType must be a string.');
        }
         if (!propertyTypeId ) {
            throw new Error('PropertyType must be a string.');
        }


        const newPropertyType = await UserPropertyInterests.create({
           
                  userId : userId,
                  propertyTypeId: propertyTypeId
             });
        return newPropertyType;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

const getAllPropertyTypeById = async (id)=>{
    try {
        const propertyType = await PropertyTypes.findByPk(id);
        if(!propertyType){
            throw new NotFoundError('Property type not found');
        }
        return propertyType;
    } catch (error) {
        console.error("error while fetching property details by id ", error)
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

const assignedPropertyTypes = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    try {
        const result = await PropertyTypes.findAll({
            
            include: [
                {
                    model: Users,
                    where: { id: userId },
                    attributes: ['id', 'name', 'phone', 'location', 'profile_picture_url', 'budget_min', 'budget_max', 'email', 'address', 'referred_by', 'password', 'role', 'isActive', 'createdAt', 'updatedAt'], // Exclude user details if not needed
                    through: { attributes: [] }, // Exclude intermediate table details
                },
            ],
            attributes: ['id', 'name'], // Fetch only required property type details
        });
        console.log("results ::", result)
        return result;
    } catch (error) {
        console.error('Error fetching property types:', error);
        throw error;
    }
};




module.exports = {
    addPropertyType,
    getAllPropertyTypes,
    getAllPropertyTypeById,
    assignPropertyTypesToUser,
    deleteProperty,
    assignedPropertyTypes,
    addPropertyTypetouser,
}