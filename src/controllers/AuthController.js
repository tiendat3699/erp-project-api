const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../config/auth');

class AuthController {
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
                    message: 'Đăng ký thành công!',
                }),
            )
            .catch((err) => res.status(404).json({ message: err }));
    }

    login(req, res) {
        User.findOne({ username: req.body.username })
            .lean()
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'Không tìm thấy tài khoản!',
                    });
                } else {
                    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (passwordMatch) {
                        const token = jwt.sign({ id: user.id }, authConfig.secretkey, {
                            expiresIn: '5m', //5 min,
                        });

                        const refreshToken = jwt.sign({ id: user.id }, authConfig.refreshsecretkey, {
                            expiresIn: '1w', //1 week,
                        });

                        res.cookie('accessToken', token, {
                            httpOnly: true,
                            maxAge: 5 * 60 * 1000, // 5 min
                        });

                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                        });

                        const { password, ...foundUser } = user;
                        return res.json({
                            user: foundUser,
                            accessToken: token,
                            refreshToken: refreshToken,
                            message: 'Đăng nhập thành công!',
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Sai mật khẩu!',
                        });
                    }
                }
            })
            .catch((err) => res.status(500).json({ message: err }));
    }

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
            message: 'Đăng xuất!',
        });
    }

    refreshToken(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        jwt.verify(refreshToken, authConfig.refreshsecretkey, (err, payload) => {
            if (err) {
                return res.status(401).json(err);
            } else {
                const newToken = jwt.sign({ id: payload.id }, authConfig.secretkey, {
                    expiresIn: '5m', //5 min,
                });

                const newRefreshToken = jwt.sign({ id: user.id }, authConfig.refreshsecretkey, {
                    expiresIn: '1w', //1 week,
                });

                res.cookie('accessToken', newToken, {
                    httpOnly: true,
                    maxAge: 1 * 60 * 60 * 1000, // 1 hour
                });

                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
            }
        });
    }
}

module.exports = new AuthController();
