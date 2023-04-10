const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const uploadFile = require('../middlewares/uploadFile');
const { ROLES } = require('../models/User.model');
const router = express.Router();

const customerController = require('../controllers/Customer.controller');

router.get('/all', userAuthentication, customerController.all);
router.post(
    '/store',
    // userAuthentication,
    // userAuthorization(ROLES.ADMIN),
    uploadFile('avatar'),
    customerController.store,
);

module.exports = router;
