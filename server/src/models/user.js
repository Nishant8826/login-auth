const mongoose = require("mongoose");

const user = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })


const User = mongoose.model('User', user);

module.exports = User;