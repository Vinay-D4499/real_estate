const bcrypt = require('bcrypt');
const Users = require('../models/userModel');

const saltRounds = 10;  // Salt rounds for bcrypt

const createUser = async (userData) => {
    try {
        // Hash the user's password before saving
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;  // Replace plain password with hashed password

        // Save user to the database
        const newUser = await Users.create(userData);
        return newUser;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Email is already registered.');
        }
        throw new Error('Failed to create user');
    }
};

module.exports = {
    createUser,
};
