const jwt = require('jsonwebtoken');
const jwt_token = process.env.JWT_SECRET;
const { UnauthorizedError, ForbiddenError } = require('../errors/httpErrors');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer token 

    if (!token) {
        return next(new UnauthorizedError('Access token is missing or invalid'));
    }

    jwt.verify(token, jwt_token, (err, decodedToken) => {
        if (err) {
            return next(new ForbiddenError('Token is invalid or expired'));
        }

        req.user = decodedToken.id;
        console.log("User ID from auth middleware:", decodedToken.id);
        next();
    });
};

module.exports = authenticateToken; 
    
