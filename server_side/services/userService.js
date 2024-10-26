const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const { BadRequestError, NotFoundError, InternalServerError } = require('../errors/httpErrors'); 

const saltRounds = 10;

const createUser = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;

        const newUser = await Users.create(userData);
        return newUser;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BadRequestError('Email is already registered.');
        }
        throw new InternalServerError('Failed to create user');
    }
};

const createUserByRquest = async (userData) => {
    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ where: { email: userData.email } });
        if (existingUser) {
            // If user exists, return a custom message or handle accordingly
            return { message: 'User already exists', user: existingUser };
        }

        // If user doesn't exist, create a new one
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;

        const newUser = await Users.create(userData);
        return { message: 'User created successfully', user: newUser };
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BadRequestError('Email is already registered.');
        }
        throw new InternalServerError('Failed to create user');
    }
};

const findUserById = async (userId) => {
    try {
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await Users.findOne({where : {email}});

        if (!user) {
            throw new NotFoundError('No Account found with this Email');
        }

        return user;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};

const updateUserById = async (userId, userData) => {
    try {
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const updatedUser = await user.update(userData);
        return updatedUser;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    updateUserById,
    createUserByRquest,
};
