const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const { BadRequestError, NotFoundError, InternalServerError, ForbiddenError } = require('../errors/httpErrors'); 
// const Admin = require('../models/adminModel');
const { Admin } = require('../models');

const saltRounds = 10;

const createUser = async (id,userData) => {
    try {
        const requester = await Admin.findByPk(id);

        if (!requester) {
            throw new ForbiddenError('Access Forbidden');
        }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }
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

// const createUserByRquest = async (userData) => {
//     try {
//         // Check if the user already exists
//         const existingUser = await Users.findOne({ where: { email: userData.email } });
//         if (existingUser) {
//             // If user exists, return 
//             return { message: 'User already exists', user: existingUser };
//         }

//         // If user doesn't exist, create a new one
//         const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
//         userData.password = hashedPassword;

//         const newUser = await Users.create(userData);
//         return { message: 'User created successfully', user: newUser };
//     } catch (error) {
//         if (error.name === 'SequelizeUniqueConstraintError') {
//             throw new BadRequestError('Email is already registered.');
//         }
//         throw new InternalServerError('Failed to create user');
//     }
// };

const createAdminByRequest = async (adminData) => {
    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ where: { email: adminData.email } });
        if (existingAdmin) {
            // If admin exists, return
            return { message: 'Admin already exists', admin: existingAdmin };
        }

        // If admin doesn't exist, create a new one
        const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);
        adminData.password = hashedPassword;

        const newAdmin = await Admin.create(adminData);
        return { message: 'Admin created successfully', admin: newAdmin };
    } catch (error) {
        console.error(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new BadRequestError('Email is already registered.');
        }
        console.log(error)
        throw new InternalServerError('Failed to create admin');
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
const findUserByPhoneNumber = async (phone) => {
    try {
        const user = await Users.findOne({where : {phone: phone}});
        console.log("received phone number in service method of phone number :::", phone)
        if (!user) {
            throw new NotFoundError('User not found');
        }
        console.log("user by phone number ", user)
        return user;
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
};

const getAdminDetails = async (userId) => {
    try {
        const user = await Admin.findByPk(userId);

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
        const requester = await Admin.findByPk(requesterId);

        if (!requester) {
            throw new ForbiddenError('Access Forbidden');
        }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }

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

const getInactiveCustomerDetails = async (requesterId) => {
    try {
        const requester = await Admin.findByPk(requesterId);

        if (!requester) {
            throw new ForbiddenError('Access Forbidden');
        }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }

        const customers = await Users.findAll({
            where: {
                isActive: false
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
        const requester = await Admin.findByPk(requesterId);
        if (!requester) {
            throw new ForbiddenError('Access Forbidden');
        }

        const userToUpdate = await Users.findByPk(userIdToUpdate);
        if (!userToUpdate) {
            throw new NotFoundError('User to update not found');
        }

        // if (requester.role !== 'ADMIN') {
        //     throw new ForbiddenError('Access Forbidden');
        // }

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

const activateUserById = async (userId) => {
    try {
        const user = await Users.findByPk(userId);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        user.isActive = true;
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
    findUserByPhoneNumber,
    getAdminDetails,
    findUserByEmail,
    updateUserById,
    // createUserByRquest,
    createAdminByRequest,
    updateUserProfilePicById,
    getAllCustomerDetails,
    getInactiveCustomerDetails,
    deactivateUserById,
    activateUserById
};
