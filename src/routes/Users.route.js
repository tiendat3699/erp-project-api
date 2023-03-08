const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const { ROLES } = require('../models/User.model');
const router = express.Router();

const userController = require('../controllers/User.controller');

router.get('/me', userAuthentication, userController.currentUser);
router.get('/all', userAuthentication, userAuthorization(ROLES.ADMIN, ROLES.USER), userController.all);

module.exports = router;
