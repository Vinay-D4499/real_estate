const express = require('express');
const userController = require('../controllers/userController');
// const { validateCreateUser,validateUpdateUser } = require('../validators/userValidator');
const validate = require('../validators/userValidator')
const verifyToken = require('../middlewares/authMiddleware')
const router = express.Router();
// const upload = require('../config/uploadConfig');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.post('/createUser', verifyToken, userController.createUser);

router.post('/createUserByRequest',  userController.createUserByRequest);

router.get('/findUserById',verifyToken, userController.findUserById);

router.post('/findUserByPhoneNumber', userController.findUserByPhoneNumber);

router.get('/getAdminDetails',verifyToken, userController.getAdminDetails);
 
router.get('/getUserById/:id',verifyToken, userController.getUserById); 

router.get('/getAllCustomerDetails',verifyToken, userController.getAllCustomerDetails); 

router.get('/getInactiveCustomerDetails',verifyToken, userController.getInactiveCustomerDetails); 

router.put('/updateUserById/:id',verifyToken, validate.validateUpdateUser, userController.updateUserById);

router.put('/updateProfilePicture/:id', upload.single('profilePicture'), userController.updateProfilePicture);

router.put('/updateAdminProfilePicture/:id', upload.single('profilePicture'), userController.updateAdminProfilePicture);

router.post('/getProfilePicture', userController.getProfilePicture);

router.post('/getAdminProfilePicture', userController.getAdminProfilePicture);

router.put('/deleteUserById/:id', userController.deleteUserById);

router.put('/activateUserById/:id', userController.activateUserById);

router.post('/sendAutomatedWhatsAppMessages', userController.sendAutomatedWhatsAppMessages);

module.exports = router;
