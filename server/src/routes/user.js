const express = require('express');
const { signup, login } = require('../controllers/auth');
const { checkAuth } = require('../middlewares/auth');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/check-auth', checkAuth, (req, res) => {
    res.status(200).json({ success: true, user: req.user, message: "User is authenticated" });
});

module.exports = router;