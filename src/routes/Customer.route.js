const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const { ROLES } = require('../models/User.model');
const router = express.Router();

const customerController = require('../controllers/Customer.controller');

//config multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/all', userAuthentication, customerController.all);
router.post(
    '/store',
    userAuthentication,
    userAuthorization(ROLES.ADMIN),
    upload.single('avatar'),
    customerController.store,
);

module.exports = router;
