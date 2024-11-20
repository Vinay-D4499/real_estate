// routes/userPropertyDetailsRoutes.js
const express = require('express');
const userPropertyDetailsrouter = express.Router();
const userPropertyDetailsController = require('../controllers/userPropertyDetailsController');
const verifyToken = require('../middlewares/authMiddleware')

userPropertyDetailsrouter.post('/details', userPropertyDetailsController.createUserPropertyDetails);
userPropertyDetailsrouter.get('/details', userPropertyDetailsController.getAllUserPropertyDetails);
userPropertyDetailsrouter.get('/detail', userPropertyDetailsController.getUserPropertyDetailById);
userPropertyDetailsrouter.get('/getUserPropertyDetailByTokenId',verifyToken,  userPropertyDetailsController.getUserPropertyDetailByTokenId);
userPropertyDetailsrouter.put('/update/:userid', userPropertyDetailsController.updateUserPropertyDetail);
userPropertyDetailsrouter.delete('/delete', userPropertyDetailsController.deleteUserPropertyDetail);
userPropertyDetailsrouter.get('/getdetailsbyid', userPropertyDetailsController.fecthuserdeatils);

module.exports = userPropertyDetailsrouter;

