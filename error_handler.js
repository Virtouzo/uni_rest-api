module.exports = function errorHandler(err, req, res, next) {
    console.error(err)
    res.status(400).json({
        success: false,
        type: 'error',
        message: err.message
    });
}