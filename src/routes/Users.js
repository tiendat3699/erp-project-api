const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const { ROLES } = require('../models/User');
const router = express.Router();

const usersController = require('../controllers/UsersController');

router.get('/me', userAuthentication, usersController.currentUser);
router.get('/all', userAuthentication, userAuthorization(ROLES.ADMIN, ROLES.USER), usersController.all);

module.exports = router;
