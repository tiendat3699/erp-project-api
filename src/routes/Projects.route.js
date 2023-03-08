const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const { ROLES } = require('../models/User.model');
const router = express.Router();

const projectController = require('../controllers/Project.controller');

router.get('/all', userAuthentication, projectController.all);
router.post('/store', userAuthentication, userAuthorization(ROLES.ADMIN), projectController.store);
module.exports = router;
