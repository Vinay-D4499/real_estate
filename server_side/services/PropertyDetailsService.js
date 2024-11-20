const { NotFoundError, ForbiddenError,BadRequestError,InternalServerError } = require('../errors/httpErrors');
const PropertyDetails = require('../models/propertyDetailsModel');
const PropertyType = require('../models/propertyTypesModel');
// const {PropertyMedia, User, UserPropertyInterests} = require('../models');
const PropertyMedia = require('../models/propertyMedia');
const User = require('../models/userModel');

const { sequelize } = require("../config/dbConfig");


 // Create Property
 const  createProperty = async (propertydetailsdata) => {
    try {
        // const {
        //     property_name,
        //     property_type_id,
        //     property_description,   
        //     property_address,
        //     property_sq_feets_or_length,
        //     property_price,
        //     is_available
        // } = propertydetailsdata;
        console.log("============", propertydetailsdata)

         console.log(propertydetailsdata,"---------------------------id")
        // Check if the property type exists in PropertyTypes table
        const propertyType = await PropertyType.findByPk(propertydetailsdata.property_type_id);
        console.log(propertyType,"----------------------->");


        if (!propertyType) {
            throw new NotFoundError('Invalid property type ID');
        }

    console.log(propertydetailsdata.property_name,"--------------------propertydetailsdata.property_name")

       
        const property = await PropertyDetails.create({
            property_name : propertydetailsdata.property_name,
            property_type_id :propertydetailsdata.property_type_id,
            property_description: propertydetailsdata. property_description,
            property_address : propertydetailsdata.property_address,
            property_sq_feets_or_length : propertydetailsdata.property_sq_feets_or_length,
            property_price : propertydetailsdata.property_price,
            is_available : propertydetailsdata. is_available
        });
        return property;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError) {
            throw error;  // Rethrow specific errors to be caught by the controller
        }
        console.error(error);
        throw new InternalServerError('Error creating property');
    }
    }


    const getAllProperties = async () => {
        try {
            const getall = await PropertyDetails.findAll({
                include: [
                    {
                        model: PropertyMedia,
                        as: 'media',
                        attributes: ['propertyDetails_id', 'propertymedia_img', 'propertymedia_video'],
                        required: false, // Makes the join optional, fetching even if no media exists
                    }
                ]
            });
    
            if (!getall) {
                throw new NotFoundError("PropertyDetails not found");
            }
            return getall;
    
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw new InternalServerError('Error fetching properties');
        }
    }


const getPropertyById = async (propertyId) => {
    try {
        console.log(propertyId, "----------propertyId");

        // Fetch PropertyDetails with associated media and users based on property type
        const propertyDetails = await PropertyDetails.findAll({
            where: { property_type_id: propertyId },
            include: [
                {
                    model: PropertyMedia,
                    as: 'media',
                    attributes: ['propertyDetails_id', 'propertymedia_img', 'propertymedia_video','propertymedia_id'],
                    required: false // This allows fetching properties without media as well
                }
            ]
        });

        // Check if PropertyDetails exist
        if (!propertyDetails || propertyDetails.length === 0) {
            throw new NotFoundError("PropertyDetails not found for this id");
        }

        // Fetch associated Users with PropertyTypes (if needed)
        const users = await User.findAll({
            include: [
                {
                    model: PropertyType,
                    attributes: ['id', 'name']
                }
            ]
        });

        // Return the result
        return { 
            propertyDetails,
            users
        };

    } catch (error) {
        console.error("Error fetching property:", error);
        throw new Error('Error fetching property');
    }
};
const getPropertyDetailsById = async (id) => {
    try {
        console.log(id, "----------propertyId");

        // Fetch PropertyDetails with associated media and users based on property type
        const propertyDetails = await PropertyDetails.findAll({
            where: { id: id },
            include: [
                {
                    model: PropertyMedia,
                    as: 'media',
                    attributes: ['propertyDetails_id', 'propertymedia_img', 'propertymedia_video','propertymedia_id'],
                    required: false // This allows fetching properties without media as well
                }
            ]
        });

        // Check if PropertyDetails exist
        if (!propertyDetails || propertyDetails.length === 0) {
            throw new NotFoundError("PropertyDetails not found for this id");
        }

        // Fetch associated Users with PropertyTypes (if needed)
        const users = await User.findAll({
            include: [
                {
                    model: PropertyType,
                    attributes: ['id', 'name']
                }
            ]
        });

        // Return the result
        return { 
            propertyDetails,
            users
        };

    } catch (error) {
        console.error("Error fetching property:", error);
        throw new Error('Error fetching property');
    }
};




  // Update Property
  const  updateProperty = async(propertyId, propertydetailsdata) => {
    const {
        property_name,
        property_description,
        property_address,
        property_sq_feets_or_length,
        property_price,
        is_available
    } = propertydetailsdata;
    try {
        const property = await PropertyDetails.findOne({ where: { id: propertyId } });
        if (!property) {
            throw new NotFoundError('id not exists'); // Property not found
        }
        return await property.update(propertydetailsdata);
    } catch (error) {
        throw new InternalServerError('Error updating property');
    }
}

// Service method to deactivate a property
const deactivateProperty = async (propertyId) => {
    try {
        // Find the property by ID
        const property = await PropertyDetails.findByPk(propertyId);

        // If the property does not exist, throw an error
        if (!property) {
            throw new BadRequestError('Property not found');
        }

        // Update the is_available field to false
        property.is_available = false;

        // Save the updated property
        await property.save();

        return property;  // Return the updated property data
    } catch (error) {
        console.error(error);
        throw new InternalServerError('Error deactivating property');
    }
};

    // Delete Property
    // const  deleteProperty = async (propertyId) => {
    //     try {
    //         const property = await PropertyDetails.findOne({ where: { id: propertyId } });
    //         if (!property) {
    //             return null; // Property not found
    //         }
    //         await property.destroy();
    //         return true;
    //     } catch (error) {
    //         throw new InternalServerError('Error deleting property');
    //     }
    // }



module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    getPropertyDetailsById,
    updateProperty,
    deactivateProperty,
    // deleteProperty,
}