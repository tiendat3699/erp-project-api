const express = require('express');
const userAuthentication = require('../middlewares/userAuthentication');
const userAuthorization = require('../middlewares/userAuthorization');
const { uploadFile, useDefaultImage } = require('../middlewares/uploadFile');
const { ROLES } = require('../models/User.model');
const router = express.Router();

const customerController = require('../controllers/Customer.controller');

router.get('/all', userAuthentication, customerController.all);
router.get('/deleted', userAuthentication, customerController.deleted);
router.post(
    '/store',
    userAuthentication,
    userAuthorization(ROLES.ADMIN),
    uploadFile('avatar'),
    useDefaultImage,
    customerController.store,
);
router.put('/:id', userAuthentication, userAuthorization(ROLES.ADMIN), uploadFile('avatar'), customerController.update);
router.delete('/:id', userAuthentication, userAuthorization(ROLES.ADMIN), customerController.delete);

module.exports = router;
