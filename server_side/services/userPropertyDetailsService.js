const UserPropertyDetails = require('../models/userPropertyDetails'); // Make sure to use the correct model
const { NotFoundError, BadRequestError, InternalServerError } = require('../errors/httpErrors'); // Import custom errors
const propertydetails = require('../models/propertyDetailsModel')
const propertymedia = require('../models/propertyMedia')
const PropertyType = require('../models/propertyTypesModel');
const User = require('../models/userModel');
const PropertyDetails = require('../models/propertyDetailsModel');
const PropertyMedia = require('../models/propertyMedia');

const createUserPropertyDetail = async (data) => {
    try {

        // Check for undefined, null, or empty object
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            throw new BadRequestError('propertydetails is required and cannot be empty');
        }
        return await UserPropertyDetails.create(data);
    } catch (error) {
        if (error instanceof BadRequestError) {
            throw error;
        }
        throw new InternalServerError('Error creating UserPropertyDetails');
    }
};

const getAllUserPropertyDetails = async () => {
    try {
        return await UserPropertyDetails.findAll();
    } catch (error) {
        throw new InternalServerError('Error retrieving UserPropertyDetails');
    }
};

const getUserPropertyDetailById = async (userId) => {
    try {

        if (!userId) {
            throw new BadRequestError('id undefined');
        }
        const userPropertyDetail = await UserPropertyDetails.findAll(
            {
                where: { userId: userId },
                include:[
                    {
                        model:PropertyDetails,
                        include:[
                           {
                            model:PropertyMedia,
                            as:'media'
                           }
                        ]
                    }
                ]
            }
        );
        if (!userPropertyDetail) throw new NotFoundError('UserPropertyDetail not found');
        return userPropertyDetail;
    } catch (error) {
        console.log("error  retrieving UserPropertyDetail",error)
        if (error instanceof NotFoundError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        if (error instanceof BadRequestError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        throw new InternalServerError('Error retrieving UserPropertyDetail');
    }
};

const updateUserPropertyDetail = async (id, data) => {
    try {
        if (!id) {
            throw new BadRequestError('id undefined');
        }
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            throw new BadRequestError('propertydetails is required and cannot be empty');
        }

        const userPropertyDetail = await UserPropertyDetails.findByPk(id);
        if (!userPropertyDetail) throw new NotFoundError('UserPropertyDetail not found');

        return await userPropertyDetail.update(data);
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        if (error instanceof BadRequestError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        throw new InternalServerError('Error retrieving UserPropertyDetail');
    }
};

const deleteUserPropertyDetail = async (id) => {
    try {

        if (!id) {
            throw new BadRequestError('data undefined');
        }
        const userPropertyDetail = await UserPropertyDetails.findByPk(id);
        if (!userPropertyDetail) throw new NotFoundError('UserPropertyDetail not found');

        await userPropertyDetail.destroy();
        return { message: 'Review deleted successfully' };
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        if (error instanceof BadRequestError) {
            throw error; // Re-throw if it's a NotFoundError
        }
        throw new InternalServerError('Error retrieving UserPropertyDetail');
    }
};

const getuserById = async (userId) => {
    try {

        const userPropertydetails = await UserPropertyDetails.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: propertydetails, // Include associated PropertyMedia
                    // as: 'property', // Alias for the media relation
                    attributes: ['id', 'property_name', 'property_type_id', 'property_description', 'property_address', 'property_maplocation', 'property_sq_feets_or_length', 'property_price', 'is_available', 'createdAt', 'updatedAt'],

                    include: [
                        {
                            model: propertymedia, // Include associated PropertyMedia
                            as: 'media',
                            attributes: ['propertyDetails_id', 'propertymedia_img', 'propertymedia_video'], // Select relevant fields from PropertyMedia
                        }
                    ]// Select the relevant fields from PropertyMedia
                },
            ]
        });
        console.log(userPropertydetails, "----------------userPropertydetails");
        if (!userPropertydetails) {
            throw new NotFoundError("Invalid userID Id");
        }


        const propertytype = await PropertyType.findOne({
            where: {
                id: userId
            }
        })
        console.log(propertytype, "----------------userPropertydetails");
        if (!propertytype) {
            throw new NotFoundError("Invalid userID Id");
        }

        console.log(propertytype.id, "---------------------prid");


        // Fetch associated Users (if any) related to the PropertyType
        const users = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: PropertyType, // Directly include the related PropertyTypes for Users
                    attributes: ['id', 'name'] // Select relevant fields from PropertyType
                }
            ]
        });


        // Return all the fetched data in a single object
        return {

            // All PropertyMedia associated with the PropertyType
            users,            // Associated users
            userPropertydetails,
            // propertyMedia,
        };
    } catch (error) {
        console.error("Error fetching property:", error);
        throw new Error('Error fetching property');
    }
};

module.exports = {
    createUserPropertyDetail,
    getAllUserPropertyDetails,
    getUserPropertyDetailById,
    updateUserPropertyDetail,
    deleteUserPropertyDetail,
    getuserById,
};
