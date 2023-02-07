const User = require('../models/User');

const checkExistingUsername = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.status(400).json({ message: 'Tên tài khoản đã tồn tại' });
            } else {
                next();
            }
        })
        .catch((err) => res.status(500).json({ message: err }));
};

const checkExistingEmail = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(400).json({ message: 'Email đã tồn tại' });
            } else {
                next();
            }
        })
        .catch((err) => res.status(500).json({ message: err }));
};

module.exports = { checkExistingUsername, checkExistingEmail };
