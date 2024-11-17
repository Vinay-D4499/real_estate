// routes/userPropertyDetailsRoutes.js
const express = require('express');
const userPropertyDetailsrouter = express.Router();
const userPropertyDetailsController = require('../controllers/userPropertyDetailsController');

userPropertyDetailsrouter.post('/details', userPropertyDetailsController.createUserPropertyDetails);
userPropertyDetailsrouter.get('/details', userPropertyDetailsController.getAllUserPropertyDetails);
userPropertyDetailsrouter.get('/detail', userPropertyDetailsController.getUserPropertyDetailById);
userPropertyDetailsrouter.put('/update/:userid', userPropertyDetailsController.updateUserPropertyDetail);
userPropertyDetailsrouter.delete('/delete', userPropertyDetailsController.deleteUserPropertyDetail);
userPropertyDetailsrouter.get('/getdetailsbyid', userPropertyDetailsController.fecthuserdeatils);

module.exports = userPropertyDetailsrouter;

