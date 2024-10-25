const express = require('express');
const userController = require('../controllers/userController');
// const { validateCreateUser,validateUpdateUser } = require('../validators/userValidator');
const validate = require('../validators/userValidator')

const router = express.Router();

router.post('/createUser', validate.validateCreateUser, userController.createUser);

router.get('/findUserById/:id', userController.findUserById); 

router.put('/updateUserById/:id',validate.validateUpdateUser, userController.updateUserById); 

module.exports = router;
