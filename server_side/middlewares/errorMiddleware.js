const { HttpError } = require("../errors/httpErrors");

const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;

    res.status(statusCode).json({
        message: err.message || 'An unknown error occurred',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
