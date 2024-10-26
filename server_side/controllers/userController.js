const { validationResult } = require('express-validator');
const userService = require('../services/userService');

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Validation failed'));
    }

    try {
        const { name, email, phone, password, role } = req.body;

        const newUser = await userService.createUser({ name, email, phone, password, role });

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        next(error);
    }
};

const createUserByRquest = async (req, res, next) => {
    try {
        const result = await userService.createUserByRquest({ 
            name: "Admin", 
            email: "admin@admin.com", 
            phone: "9876543210", 
            password: "Admin@1234", 
            role: "ADMIN" 
        });

        // Check if the user already exists
        if (result.user) {
            return res.status(200).json({ message: result.message, user: result.user });
        }

        // If user was created
        return res.status(201).json({ message: 'User created successfully', user: result.user });
    } catch (error) {
        next(error);
    }
};

const findUserById = async (req, res, next) => {
    // const { id } = req.params;
    const id = req.user;
    console.log(id);
    try {
        const user = await userService.findUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Validation failed'));
    }

    // const { id } = req.params;
    const id = req.user;
    const { name, role } = req.body;

    try {
        const updatedUser = await userService.updateUserById(id, { name, role });
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    findUserById,
    updateUserById,
    createUserByRquest,
};
