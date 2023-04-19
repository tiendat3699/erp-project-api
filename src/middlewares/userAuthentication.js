const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const authConfig = require('../config/auth');

const userAuthentication = (req, res, next) => {
    const token = req.header('x-access-token');
    jwt.verify(token, authConfig.secretkey, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error_code: 1,
                isError: true,
                error: err,
            });
        } else {
            User.findById(payload.id)
                .select('-password')
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
