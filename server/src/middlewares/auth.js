const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const TryCatch = require("../utils/tryCatchHandler");

const checkAuth = TryCatch(async (req, res, next) => {
    const token = req?.headers?.authorization || req?.cookies?.token;
    if (!token) return next(new ErrorHandler(401, "Unauthorized"));

    const decoded = await jwt.verify(token, 'restart restart');
    if (!decoded) return next(new ErrorHandler(401, "Unauthorized"));

    req.user = decoded;
    req.token = token;
    next();
});

module.exports = { checkAuth };