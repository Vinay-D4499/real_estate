const propertyServices = require('../services/propertyService');


const addPropertyType = async (req,res, next)=>{
    try {
        const id = req.user;
        const {propertyType} = req.body;
        const property = await propertyServices.addPropertyType(id,propertyType);

        return res.status(201).json({ message: 'Proerty added successfully', property: property });

    } catch (error) {
        next();
    }
}

const getAllPropertyTypes = async (req, res, next)=>{
    const properties = await propertyServices.getAllPropertyTypes();

    return res.status(200).json({message : 'Fetched All properties', properties : properties})
}

const assignPropertyTypesToUser = async (req, res, next) => {
    const { userId, propertyTypeIds } = req.body; 

    if (!userId || !propertyTypeIds || !Array.isArray(propertyTypeIds)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const assignedProperties = await propertyServices.assignPropertyTypesToUser(userId, propertyTypeIds);
        return res.status(201).json({ message: 'Assigned property types to user successfully', assignedProperties });
    } catch (error) {
        next(error);
    }
};


const deleteProperty = async (req, res, next) => {
    try {
       
        const { propertyId } = req.params; // Property ID from URL params
          console.log(propertyId , "===================>");
        // Call the service method to delete the property by ID and user ID
        const result = await propertyServices.deleteProperty(propertyId);

        if (result) {
            return res.status(200).json({ message: 'Property deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        next(error); // Pass the error to error handling middleware
    }
};

module.exports = {
    addPropertyType,
    getAllPropertyTypes,
    assignPropertyTypesToUser,
    deleteProperty,
}