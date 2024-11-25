const propertyDetailsService = require('../services/PropertyDetailsService');
const { NotFoundError, ForbiddenError,BadRequestError,InternalServerError } = require('../errors/httpErrors');
const  userproperty = require('../models/userPropertyInterestsModel')
 

// Create Property
const createProperty = async (req, res,next) => {

    const { propertydetailsdata } = req.body;
    console.log("property Details Data :: ", propertydetailsdata)
    try {
        const property = await propertyDetailsService.createProperty(propertydetailsdata);
       
        res.status(201).json({ message: 'Property created successfully', property });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        } else {
            next(error);  // Pass internal server errors to error-handling middleware
        }
        next(error);
    }
};

// Get All Properties
 const getAllProperties = async (req, res, next) => {
    try {
        const properties = await propertyDetailsService.getAllProperties();
        res.status(200).json({ properties });
    } catch (error) {
        
        next(error);
    }
};


// Get Property by ID
const getPropertyById = async (req, res, next) => {
    const {propertyId} = req.params;
    try {
        const property = await propertyDetailsService.getPropertyById(propertyId);
        // if (!property) throw new NotFoundError('Property not found');
        res.status(200).json({ property });
    } catch (error) {
        console.log("error from getPorpertyById ::::>>>>", error)
        next(error);
    }
};
const getPropertyDetailsById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const property = await propertyDetailsService.getPropertyDetailsById(id);
        // if (!property) throw new NotFoundError('Property not found');
        res.status(200).json({ property });
    } catch (error) {
        console.log("error from getPorpertyById ::::>>>>", error)
        next(error);
    }
};

// Update Property
const updateProperty = async (req, res, next) => {
    const {propertyId} = req.params;
    const {propertydetailsdata} = req.body;
    try {
        const updatedProperty = await propertyDetailsService.updateProperty(propertyId, propertydetailsdata);
        if (!updatedProperty) throw new NotFoundError('Property not found');
        res.status(200).json({ message: 'Property updated successfully', updatedProperty });
    } catch (error) {
        next(error);
    }
};

const updatePropertyStatus = async (req, res, next) => {
    const { propertyId } = req.params;
    const { is_available } = req.body; 
    console.log("property id to update :::", propertyId )

    try {
        if (typeof is_available !== 'boolean') {
            return res.status(400).json({ message: '`is_available` must be a boolean value' });
        }

        const updatedProperty = await propertyDetailsService.updatePropertyStatus(propertyId, is_available);
        if (!updatedProperty) throw new NotFoundError('Property not found');

        res.status(200).json({ message: 'Property status updated successfully', updatedProperty });
    } catch (error) {
        next(error);
    }
};


const deactivate_property_available = async (req, res) => {
    try {
        const { propertyId } = req.params;  // Get the property ID from the URL

        // Call service method to deactivate the property
        const updatedProperty = await propertyDetailsService.deactivateProperty(propertyId);

        res.status(200).json({
            message: 'Property deactivated successfully',
            data: updatedProperty
        });
    } catch (error) {
        console.error(error);
        return { error: "Failed to send message" };
    }
};

// // Delete Property
// exports.deleteProperty = async (req, res, next) => {
//     const {propertyId} = req.params;
//     try {
//         const deleted = await PropertyService.propertyDetailsService(propertyId);
//         if (!deleted) throw new NotFoundError('Property not found');
//         res.status(200).json({ message: 'Property deleted successfully' });
//     } catch (error) {
//         next(error);
//     }
// };

module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    getPropertyDetailsById,
    updatePropertyStatus,
    updateProperty,
    deactivate_property_available,
};
