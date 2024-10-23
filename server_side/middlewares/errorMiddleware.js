const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;  // Default to 500 if not set
    res.status(statusCode).json({
        message: err.message || 'An unknown error occurred',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Hide stack trace in production
    });
};

module.exports = errorHandler;
