const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../config/auth');

class UsersController {
    currentUser(req, res) {
        const token = req.header('x-access-token');
        jwt.verify(token, authConfig.secretkey, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    isError: true,
                    error: err,
                });
            } else {
                User.findOne({ id: payload.id })
                    .lean()
                    .then((user) => {
                        if (!user) {
                            return res.status(401).json({
                                isError: true,
                                message: 'Không tìm thấy tài khoản!',
                            });
                        } else {
                            const { password, ...foundUser } = user;
                            res.json({
                                user: foundUser,
                            });
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
    }
}

module.exports = new UsersController();
