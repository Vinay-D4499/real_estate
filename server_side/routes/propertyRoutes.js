const express = require('express');
const propertyRoutes = express.Router();
const propertyController = require('../controllers/propertyConroller');
const verifyToken = require('../middlewares/authMiddleware');

propertyRoutes.post('/addPropertyType', verifyToken,  propertyController.addPropertyType);

// propertyRoutes.post('/addPropertyType/:propertyType', verifyToken,  propertyController.addPropertyType);

propertyRoutes.get('/getAllPropertyTypes', propertyController.getAllPropertyTypes);
propertyRoutes.get('/getAllPropertyTypeById', propertyController.getAllPropertyTypeById);

propertyRoutes.get('/assignPropertyTypesToUser', propertyController.assignPropertyTypesToUser);
propertyRoutes.get('/assignedPropertyTypesbyuserid/:userId', propertyController.assignedPropertiesbyuser);
propertyRoutes.post('/assignedPropertyTypesbyuser', propertyController.addPropertyTypetouser);



propertyRoutes.delete('/deletePropertyType/:propertyId', propertyController.deleteProperty);




module.exports = propertyRoutes;