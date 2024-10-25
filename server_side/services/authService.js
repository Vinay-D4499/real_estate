const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
const { UnauthorizedError, InternalServerError } = require('../errors/httpErrors');

const jwt_token = process.env.JWT_SECRET; 

const signIn = async (email, password) => {
    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedError('Invalid Email or Password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid Email or Password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            jwt_token,
            { expiresIn: '7d' }
        );

        return { token, user };
        
    } catch (error) {
        if (!error.statusCode) {
            throw new InternalServerError("Failed to sign in");
        }
        throw error;
    }
}

const updatePassword = async (id, oldPassword, newPassword) => {
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Old password is incorrect");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        return { message: 'Password updated successfully' };

    } catch (error) {
        if (!error.statusCode) {
            throw new InternalServerError("Failed to update password");
        }
        throw error;
    }
}

const resetPassword = async (userId, newPassword) => {
    try {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        const updatedUser = await Users.update(
            { password: hashedNewPassword },
            { where: { id: userId } }
        );

        if (!updatedUser) {
            throw new NotFoundError('User not found');
        }

        return updatedUser;
    } catch (error) {
        if (!error.statusCode) {
            throw new InternalServerError("Failed to reset password");
        }
        throw error;
    }
};

//--------------------------------------//
module.exports = {
    signIn,
    updatePassword,
    resetPassword
};
//--------------------------------------//