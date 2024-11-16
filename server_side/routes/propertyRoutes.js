const express = require('express');
const propertyRoutes = express.Router();
const propertyController = require('../controllers/propertyConroller');
const verifyToken = require('../middlewares/authMiddleware');

propertyRoutes.post('/addPropertyType', verifyToken,  propertyController.addPropertyType);

// propertyRoutes.post('/addPropertyType/:propertyType', verifyToken,  propertyController.addPropertyType);

propertyRoutes.get('/getAllPropertyTypes', propertyController.getAllPropertyTypes);

propertyRoutes.get('/assignPropertyTypesToUser', propertyController.assignPropertyTypesToUser);



propertyRoutes.delete('/deletePropertyType/:propertyId', propertyController.deleteProperty);




module.exports = propertyRoutes;