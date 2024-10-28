const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const userService = require('../services/userService');
const propertyServices = require('../services/propertyService');
const { sequelize } = require('../models');

// const createUser = async (req, res, next) => {
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //     return next(new BadRequestError('Validation failed'));
//     // }

//     try {
//         const id = req.user;
//         const { name, email, phone } = req.body;
//         const password = 'User@12345';
//         const role = req.body.role || 'CUSTOMER';
//         const newUser = await userService.createUser(id,{ name, email, phone, password, role });

//         return res.status(201).json({ message: 'Customer added successfully', user: newUser });
//     } catch (error) {
//         console.log("error ", error)
//         next(error);
//     }
// };

const createUser = async (req, res, next) => {
    const transaction = await sequelize.transaction(); 
    try {
        const id = req.user;
        const { name, email, phone, propertyTypeIds } = req.body;
        const password = 'User@12345';
        const role = req.body.role || 'CUSTOMER';

        const newUser = await userService.createUser(id, { name, email, phone, password, role }, { transaction });

        if (propertyTypeIds && Array.isArray(propertyTypeIds)) {
            await propertyServices.assignPropertyTypesToUser(newUser.id, propertyTypeIds, { transaction });
        }

        await transaction.commit(); 

        return res.status(201).json({ message: 'Customer added successfully', user: newUser });
    } catch (error) {
        await transaction.rollback(); 
        console.log("error ", error);
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

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    // const id = req.user;
    console.log(id);
    try {
        const user = await userService.findUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const getAllCustomerDetails = async(req, res, next) => {
    const id = req.user;
    try {
        const customers = await userService.getAllCustomerDetails(id);
        return res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
}

const updateUserById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Validation failed'));
    }

    // Retrieve the user ID from the URL parameters
    const userIdToUpdate = req.params.id; // ID of the user to update
    const requesterId = req.user; // ID of the requester (from JWT)

    const {
        name,
        role,
        phone,
        location,
        profile_picture_url,
        budget_min,
        budget_max,
        email,
        address,
        referred_by
    } = req.body;

    try {
        const updatedUser = await userService.updateUserById(requesterId, userIdToUpdate, {
            name,
            role,
            phone,
            location,
            profile_picture_url,
            budget_min,
            budget_max,
            email,
            address,
            referred_by
        });

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

const updateProfilePicture = async (req, res, next) => {
    const userId = req.user; 
    
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has an existing profile picture
        const oldProfilePicture = user.profile_picture_url;
        if (oldProfilePicture) {
            const oldFilePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', oldProfilePicture);
            
            // deletes the old profile picture
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        user.profile_picture_url = req.file.filename;
        await user.save();

        return res.status(200).json({ message: 'Profile picture updated successfully', user });

    } catch (error) {
        next(error);
    }
};

const getProfilePicture = async (req, res, next) => {
    const { id } = req.body;

    try {
        const user = await userService.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profilePicturePath = user.profile_picture_url 
            ? path.join(__dirname, '..', 'uploads', 'profile_pictures', user.profile_picture_url) 
            : path.join(__dirname, '..', 'uploads', 'profile_pictures', 'default.png'); 

        if (fs.existsSync(profilePicturePath)) {
            return res.sendFile(profilePicturePath);
        } else {
            return res.status(404).json({ message: 'Profile picture not found' });
        }

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    findUserById,
    getUserById,
    updateUserById,
    createUserByRquest,
    updateProfilePicture,
    getProfilePicture,
    getAllCustomerDetails
};
