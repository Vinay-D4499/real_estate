const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
const { UnauthorizedError, InternalServerError } = require('../errors/httpErrors');
const Admins = require('../models/adminModel');

const jwt_token = process.env.JWT_SECRET; 

// const signIn = async (email, password) => {
//     try {
//         const user = await Users.findOne({ where: { email } });
//         if (!user) {
//             throw new UnauthorizedError('Invalid Email or Password');
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             throw new UnauthorizedError("Invalid Email or Password");
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user.id, email: user.email, role: user.role },
//             jwt_token,
//             { expiresIn: '7d' }
//         );

//         return { token, user };
        
//     } catch (error) {
//         if (!error.statusCode) {
//             throw new InternalServerError("Failed to sign in");
//         }
//         throw error;
//     }
// }

const signIn = async (email, password,phone) => {
    try {

        let user;
        let role = 'ADMIN';

        // First, check if the email is provided, and try to find the user in the Admins table
        if (email) {
            user = await Admins.findOne({ where: { email } });

            // If not found in Admins, check in Users
            if (!user) {
                user = await Users.findOne({ where: { email } });
                role = 'CUSTOMER';
            }
        }

        // If email is not found, check phone number
        if (!user && phone) {
            // Check phone number in Admins table
            user = await Admins.findOne({ where: { phone } });
            role = 'ADMIN';

            // If not found in Admins, check in Users
            if (!user) {
                user = await Users.findOne({ where: { phone } });
                console.log("user :::>>>", user)
                role = 'CUSTOMER';
            }
        }

        // If user is still not found, throw an unauthorized error
        if (!user) {
            throw new UnauthorizedError('Invalid Email or Password');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid Email or Password");
        }

        // Generate JWT token with the user's role and ID
        const token = jwt.sign(
            { id: user.id, email: user.email, phone : user.phone,role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
         console.log(token);
        // Return the token and user details
        return { token, user: { ...user.toJSON(), role } };

    } catch (error) {
        if (!error.statusCode) {
            throw new InternalServerError("Failed to sign in");
        }
        throw error;
    }
};


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