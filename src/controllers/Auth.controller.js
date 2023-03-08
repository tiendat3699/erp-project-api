const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authConfig = require('../config/auth');

class AuthController {
    //[POST] /auth/signup
    signup(req, res) {
        const user = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        user.save()
            .then((user) =>
                res.json({
                    isError: false,
                    message: 'Đăng ký thành công!',
                }),
            )
            .catch((err) =>
                res.status(404).json({
                    isError: true,
                    message: err,
                }),
            );
    }

    //[POST] /auth/login
    login(req, res) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        isError: true,
                        message: 'Không tìm thấy tài khoản!',
                    });
                } else {
                    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (passwordMatch) {
                        const token = jwt.sign({ id: user._id }, authConfig.secretkey, {
                            expiresIn: '5m', //5 min,
                        });

                        const refreshToken = jwt.sign({ id: user._id }, authConfig.refreshsecretkey, {
                            expiresIn: '1w', //1 week,
                        });

                        return res.json({
                            isError: false,
                            message: 'Đăng nhập thành công!',
                            tokens: {
                                accessToken: token,
                                refreshToken: refreshToken,
                            },
                        });
                    } else {
                        return res.status(400).json({
                            isError: true,
                            message: 'Sai mật khẩu!',
                        });
                    }
                }
            })
            .catch((err) =>
                res.status(500).json({
                    isError: true,
                    error: err,
                }),
            );
    }

    //[DELETE] /auth/logout
    logout(req, res) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });

        res.json({
            isError: false,
            message: 'Đăng xuất!',
        });
    }

    //[GET] /auth/refresh
    refreshToken(req, res) {
        const refreshToken = req.header('x-refresh-token');
        jwt.verify(refreshToken, authConfig.refreshsecretkey, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    isError: true,
                    error: err,
                });
            } else {
                const newToken = jwt.sign({ id: payload.id }, authConfig.secretkey, {
                    expiresIn: '5m', //5 min,
                });

                const newRefreshToken = jwt.sign({ id: payload.id }, authConfig.refreshsecretkey, {
                    expiresIn: '1w', //1 week,
                });

                return res.json({
                    isError: false,
                    message: 'got new tokens!',
                    tokens: {
                        accessToken: newToken,
                        refreshToken: newRefreshToken,
                    },
                });
            }
        });
    }
}

module.exports = new AuthController();
