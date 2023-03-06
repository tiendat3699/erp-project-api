const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

userAuthentication = (req, res, next) => {
    const token = req.header('x-access-token');
    jwt.verify(token, authConfig.secretkey, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error_code: 1,
                isError: true,
                error: err,
                token: token,
            });
        } else {
            User.findOne({ _id: payload.id }, { password: 0 })
                .lean()
                .then((user) => {
                    if (!user) {
                        return res.status(401).json({
                            isError: true,
                            message: 'Không tìm thấy tài khoản!',
                        });
                    } else {
                        req.user = user;
                        return next();
                    }
                })
                .catch((err) =>
                    res.status(500).json({
                        isError: true,
                        error: err,
                    }),
                );
        }
    });
};

module.exports = userAuthentication;
