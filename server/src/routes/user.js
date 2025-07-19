const express = require('express');
const { signup, login, logout } = require('../controllers/auth');
const { checkAuth } = require('../middlewares/auth');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/check-auth', checkAuth, (req, res) => {
    res.status(200).json({ success: true, user: req.user, token: req.token, message: "User is authenticated" });
});
router.post('/logout', logout);

module.exports = router;