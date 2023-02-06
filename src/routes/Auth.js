const express = require('express');
const verifySignUp = require('../middlewares/verifySignUp');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/signup', verifySignUp.checkExistingEmail, verifySignUp.checkExistingUsername, authController.signup);
router.post('/login', authController.login);

module.exports = router;
