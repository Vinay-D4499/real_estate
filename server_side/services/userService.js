const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const { BadRequestError, NotFoundError, InternalServerError, ForbiddenError } = require('../errors/httpErrors'); 

const saltRounds = 10;

const createUser = async (id,userData) => {
    try {
        const requester = await Users.findByPk(id);

        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;

        const newUser = await Users.create(userData);
        return newUser;
    } catch (error) {
        console.log("Error creating user ==>", error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BadRequestError('An Account Exists with the given credentials.');
        }
        throw new InternalServerError('Failed to create user');
    }
};

const createUserByRquest = async (userData) => {
    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ where: { email: userData.email } });
        console.log(existingUser , "============================>existingUser");
        if (existingUser) {
            // If user exists, return 
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

const getAllCustomerDetails = async (requesterId) => {
    try {
        const requester = await Users.findByPk(requesterId);

        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }

        const customers = await Users.findAll({
            where: {
                isActive: true
            },
            order: [['id', 'DESC']],
        });
        
        return customers;
        
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

const updateUserById = async (requesterId, userIdToUpdate, userData) => {
    try {
        const requester = await Users.findByPk(requesterId);
        if (!requester) {
            throw new NotFoundError('Requester not found');
        }

        const userToUpdate = await Users.findByPk(userIdToUpdate);
        if (!userToUpdate) {
            throw new NotFoundError('User to update not found');
        }

        if (requester.role !== 'ADMIN') {
            throw new ForbiddenError('Access Forbidden');
        }

        const updatedUser = await userToUpdate.update(userData);
        return updatedUser;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}

// userService.js
const updateUserProfilePicById = async (userId, userData) => {
    try {
        const userToUpdate = await Users.findByPk(userId);
        if (!userToUpdate) {
            throw new NotFoundError('User not found');
        }

        const updatedUser = await userToUpdate.update(userData);
        return updatedUser;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};

const deactivateUserById = async (userId) => {
    try {
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        user.isActive = false;
        await user.save(); 

        return user; 
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};


module.exports = {
    createUser,
    findUserById,
    findUserByEmail,
    updateUserById,
    createUserByRquest,
    updateUserProfilePicById,
    getAllCustomerDetails,
    deactivateUserById
};
