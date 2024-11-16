const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();
const verifyToken = require('../middlewares/authMiddleware')

const validate = require('../validators/userValidator')

authRouter.post('/signIn', validate.validateEmail, authController.signIn);

authRouter.post('/updatePassword', verifyToken, authController.updatePassword);

authRouter.post('/sendPasswordResetEmail',  validate.validateEmail, authController.sendPasswordResetEmail);

authRouter.post('/resetPassword',  validate.validatePassword, authController.resetPassword);

module.exports = authRouter ;