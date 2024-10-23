const { validationResult } = require('express-validator');
const userService = require('../services/userService');

// Controller function to handle the user creation request
const createUser = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  // Return all validation errors
    }

    try {
        const { name, email, phone, password, role } = req.body;

        // Call the service to create the user
        const newUser = await userService.createUser({ name, email, phone, password, role });

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(error);  // Forward error to centralized error handler
    }
};

module.exports = {
    createUser,
};
