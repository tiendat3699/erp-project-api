const express = require('express');
const authenticatedUser = require('../middlewares/AuthenticatedUser');
const router = express.Router();

const usersController = require('../controllers/UsersController');

router.get('/me', authenticatedUser, usersController.currentUser);

module.exports = router;
