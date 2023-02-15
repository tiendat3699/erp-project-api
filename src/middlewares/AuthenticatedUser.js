const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

authenticatedUser = (req, res, next) => {
    const token = req.cookies?.accessToken;
    jwt.verify(token, authConfig.secretkey, (err, payload) => {
        if (err) {
            return res.status(401).json(err);
        } else {
            User.findOne({ _id: payload.id })
                .then((user) => {
                    if (!user) {
                        return res.status(401).json({
                            message: 'Không tìm thấy tài khoản!',
                        });
                    } else {
                        next();
                    }
                })
                .catch((err) => res.status(500).json(err));
        }
    });
};

module.exports = authenticatedUser;
