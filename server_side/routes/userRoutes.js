const express = require('express');
const userController = require('../controllers/userController');
const { validateCreateUser } = require('../validators/userValidator');

const router = express.Router();

router.post('/createUser', validateCreateUser, userController.createUser);

module.exports = router;
