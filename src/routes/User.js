const express = require('express');
const authenticatedUser = require('../middlewares/AuthenticatedUser');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.get('/get', authenticatedUser, (req, res) => res.json({ message: 'ok' }));

module.exports = router;
