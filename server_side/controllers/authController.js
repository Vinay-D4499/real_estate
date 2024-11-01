const { validationResult } = require("express-validator");
const authService = require('../services/authService');
const userService = require('../services/userService')
const { BadRequestError, ForbiddenError } = require('../errors/httpErrors');
const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_SECRET;
const nodemailer = require('nodemailer');
const { baseURL } = require("../config/baseURL");

// const signIn = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return next(new BadRequestError('Invalid Email'));
//     }

//     try {
//         const { email, password } = req.body;
//         const { token, user } = await authService.signIn(email, password);
        
//         return res.status(200).json({
//             message: "Sign in Success", 
//             token, 
//             user: { id: user.id, name: user.name, email: user.email, role: user.role }
//         });
//     } catch (error) {
//         next(error);
//     }
// }

const signIn = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Invalid Email'));
    }

    try {
        const { email, password } = req.body;
        const { token, user } = await authService.signIn(email, password);

        return res.status(200).json({
            message: "Sign in Success",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
};


const updatePassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Password must be 8 characters with a number and a letter'));
    }

    try {
        const id = req.user;  
        const { oldPassword, newPassword } = req.body;
        console.log('password ', req.body)
        console.log("oldpasss ----->", oldPassword)
        console.log("new pass  ----->", newPassword)
        console.log("id ====>",id )

        const result = await authService.updatePassword(id, oldPassword, newPassword);
        
        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}

let transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,  //HOSTINGER PORT NUMBER
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });   

const sendPasswordResetEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Invalid Email'));
    }

    
    try {
        const { email } = req.body;
        const user = await userService.findUserByEmail(email)
        
        const token = jwt.sign({ id: user.id }, jwt_token, { expiresIn: '30m' });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // Sender address
            to: email, // Recipient's email address
            subject: 'Password Reset Request', // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>We received a request to reset the password associated with your account.</p>
                    <p>To proceed with the password reset, please click on the button below:</p>
                    <a href="${baseURL}/reset-password?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you did not request a password reset, you can ignore this email.</p>
                    <p>Please note that the link will expire after 30 minutes, so make sure to reset your password promptly.</p>
                    <p>Thank You,</p>
                </div>
            `
        };
        console.log(`${baseURL}/api/auth/resetPassword?token=${token}`)
        await transporter.sendMail(mailOptions);
        return res.status(200).send({ success: true, message: 'Password reset email sent successfully.' });

    } catch (error) {
        next(error);
    }
}

const resetPassword = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError('Password must be 8 characters with a number and a letter'));
    }

    try {
        const { newPassword } = req.body;
        const token = req.query.token;

        if (!token) {
            return next(new BadRequestError('Token is missing'));
        }

        // Verify the token and extract the user ID
        jwt.verify(token, jwt_token, async (err, decoded) => {
            if (err) {
                return next(new ForbiddenError('Invalid or expired token'));
            }

            if (!decoded || !decoded.id) {
                return next(new ForbiddenError('Invalid token payload'));
            }

            const userId = decoded.id;
            try {
                const user = await authService.resetPassword(userId, newPassword);

                if (!user) {
                    throw new NotFoundError('User not found');
                }

                return res.status(200).json({ message: 'Password has been reset successfully' });
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signIn,
    updatePassword,
    sendPasswordResetEmail,
    resetPassword
};
