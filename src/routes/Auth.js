const express = require('express');
const verifySignUp = require('../middlewares/verifySignUp');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/signup', verifySignUp.checkExistingEmail, verifySignUp.checkExistingUsername, authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.delete('/logout', authController.logout);

module.exports = router;
