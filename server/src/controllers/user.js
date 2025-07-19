const jwt = require("jsonwebtoken");
const User = require("../models/user");
const TryCatch = require("../utils/tryCatchHandler");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");


const signup = TryCatch(async (req, res) => {
    let { email, displayName, password } = req.body;
    if(!email || !displayName || !password) return next(new ErrorHandler(400, "All fields are required"));
    const isEmailExist = await User.findOne({ email });
    const token = await jwt.sign(req.body, 'restart restart', { expiresIn: 60 * 60 * 24 })
    if (!token) return next(new ErrorHandler(500, "Token generation failed"));
    if (isEmailExist) {
        isEmailExist.password = undefined;
        return res.status(200).send({ status: true, user: isEmailExist, token })
    }
    password = await bcrypt.hash(password, 12);
    const add = await User.create({});
    add.password = undefined;
    res.status(201).json({ status: true, user: add, token: token });
});


const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return next(new ErrorHandler(400, "All fields are required"));
    const user = await User.findOne({ email });
    if(!user) return next(new ErrorHandler(404, "User not found"));

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) return next(new ErrorHandler(401, "Invalid credentials"));

    const token = await jwt.sign(req.body, 'restart restart', { expiresIn: 60 * 60 * 24 })
    if (!token) return next(new ErrorHandler(500, "Token generation failed"));
    user.password = undefined;
    res.status(201).json({ status: true, user, token });
});


module.exports = { signup, login };