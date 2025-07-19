const errorMiddleware = (err, req, res, next) => {
    err.message = err.message ? err.message : 'Internal Server Error';
    err.code = err.code ? err.code : 500;
    return res.status(err.code).json({ status: false, message: err.message });
}

module.exports = errorMiddleware;