const jwt = require("jsonwebtoken");
const TryCatch = require("../utils/tryCatchHandler");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const User = require("../models/user");


const signup = TryCatch(async (req, res, next) => {
    let { email, displayName, password } = req.body;
    if (!email || !displayName || !password) return next(new ErrorHandler(400, "All fields are required"));
    const isEmailExist = await User.findOne({ email });
    const token = await jwt.sign(req.body, 'restart restart', { expiresIn: 60 * 60 * 24 })
    if (!token) return next(new ErrorHandler(200, "Token generation failed"));
    if (isEmailExist) {
        isEmailExist.password = undefined;
        return res.cookie("token", token, { httpOnly: true }).json({ success: true, user: isEmailExist, token, message: "Signed up successfully" });
    }
    password = await bcrypt.hash(password, 12);
    const add = await User.create({ email, displayName, password });
    add.password = undefined;
    return res.cookie("token", token, { httpOnly: true }).json({ success: true, user: add, token: token, message: "Signed up successfully" });
});


const login = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler(400, "All fields are required"));
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler(200, "User not found"));

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return next(new ErrorHandler(200, "Invalid credentials"));

    const token = await jwt.sign(req.body, 'restart restart', { expiresIn: 60 * 60 * 24 })
    if (!token) return next(new ErrorHandler(200, "Token generation failed"));
    user.password = undefined;
    res.cookie("token", token, { httpOnly: true, secure: false }).status(201).json({ success: true, user, token, message: "Logged in successfully" });
});


module.exports = { signup, login };