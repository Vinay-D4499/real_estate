const { body } = require('express-validator');

// validations for user data
const validateCreateUser = [
    body('name').isString().withMessage('Name must be a string').isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),

    body('email').isEmail().withMessage('Invalid email format'),

    body('phone').isString().withMessage('Phone number must be a string').matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),

    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('role').optional().isIn(['SUPER ADMIN', 'ADMIN', 'CUSTOMER']).withMessage('Invalid role'),
];

module.exports = {
    validateCreateUser,
};
