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

const findUserById = async (req, res, next) => {
    const { id } = req.params;
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

    const { id } = req.params;
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
};
