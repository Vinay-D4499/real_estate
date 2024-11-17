const express = require('express');
const propertyDetailsrouter = express.Router();
const PropertyController = require('../controllers/propertyDetailsController');

// Property Routes
propertyDetailsrouter.post('/properties', PropertyController.createProperty); // Create Property
propertyDetailsrouter.get('/properties', PropertyController.getAllProperties); // Get All Properties
propertyDetailsrouter.get('/properties/:propertyId', PropertyController.getPropertyById); // Get Property by ID
propertyDetailsrouter.put('/properties/:propertyId', PropertyController.updateProperty); // Update Property
propertyDetailsrouter.put('/deactivate/:propertyId', PropertyController.deactivate_property_available); // Delete Property

module.exports = propertyDetailsrouter;