const express = require('express');
const groupsController = require('../controllers/groupsController');
// const { validateCreateUser,validateUpdateUser } = require('../validators/userValidator');
const validate = require('../validators/userValidator')
const verifyToken = require('../middlewares/authMiddleware')
const groupRoutes = express.Router();
// const upload = require('../config/uploadConfig');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

groupRoutes.post('/creategroup', groupsController.createGroup);
groupRoutes.get('/getAllgroups',groupsController.getAllGroups);
groupRoutes.delete('/deleteGroupById/:id', groupsController.deleteGroup);
groupRoutes.put('/editGroupById/:id',groupsController.editGroup);
groupRoutes.put('/assignGroup',groupsController.assignGroupToUser);


groupRoutes.post('/addUserToGroup', groupsController.addUserToGroupController);
groupRoutes.get('/user/:userId/groups', groupsController.getGroupsForUserController);
groupRoutes.get('/group/:groupId/users', groupsController.getUsersForGroupController);


//groupRoutes.get('/findUserBygroupId',verifyToken, groupsController.findUserBygroupId);

//router.get('/getAdminDetails',verifyToken, userController.getAdminDetails);
 
//router.get('/getUserById/:id',verifyToken, userController.getUserById); 

//router.get('/getAllGroupDetails',verifyToken, groupController.getAllgroupDetails); 

//router.get('/getInactiveCustomerDetails',verifyToken, userController.getInactiveCustomerDetails); 

//router.put('/updateUserById/:id',verifyToken, validate.validateUpdateUser, userController.updateUserById);

//router.put('/updateProfilePicture/:id', upload.single('profilePicture'), userController.updateProfilePicture);

//router.put('/updateAdminProfilePicture/:id', upload.single('profilePicture'), userController.updateAdminProfilePicture);

//router.post('/getProfilePicture', userController.getProfilePicture);

//router.post('/getAdminProfilePicture', userController.getAdminProfilePicture);

//groupRoutes.put('/deleteGroupbygroupId/:id', groupController.deleteUserById);

//router.put('/activateUserById/:id', userController.activateUserById);

module.exports = groupRoutes ;