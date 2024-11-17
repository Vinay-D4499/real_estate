const express = require('express');
const multer = require('multer');
const propertyMediaController = require('../controllers/propertyMediaController');
const propertyMediaroutes = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to update the property media image
propertyMediaroutes.post('/propertyMedia_img/:property_id', upload.single('file'), propertyMediaController.propertMedia_img);
propertyMediaroutes.post('/propertyMedia_video/:property_id', upload.single('video'), propertyMediaController.propertMedia_video);
propertyMediaroutes.put('/updateMedia', upload.single('media'), propertyMediaController.updateMediaFile);
propertyMediaroutes.delete('/propertymedia/:propertymedia_id',propertyMediaController.deletePropertyMedia);
propertyMediaroutes.get('/getallpropertymedia',propertyMediaController.getAllPropertymedia);
propertyMediaroutes.get('/getallpropertymedia/:propertyId',propertyMediaController.getPropertymediaById);

module.exports = propertyMediaroutes;
