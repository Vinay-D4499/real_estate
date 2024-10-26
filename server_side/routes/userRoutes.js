const express = require('express');
const userController = require('../controllers/userController');
// const { validateCreateUser,validateUpdateUser } = require('../validators/userValidator');
const validate = require('../validators/userValidator')
const verifyToken = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/createUser', validate.validateCreateUser, userController.createUser);

router.post('/createUserByRquest',  userController.createUserByRquest);

router.get('/findUserById',verifyToken, userController.findUserById); 

router.put('/updateUserById',verifyToken, validate.validateUpdateUser, userController.updateUserById);

module.exports = router;
