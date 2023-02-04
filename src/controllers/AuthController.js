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
                    message: 'sign up success',
                    accessToken: user,
                }),
            )
            .catch((err) => res.status(404).json({ message: err }));
    }

    login(req, res, next) {
        User.findOne({ username: req.body.username })
            .then((user) => {
                if (!user) {
                    res.json({
                        accessToken: null,
                        message: 'Không tìm thấy tài khoản!',
                    });
                } else {
                    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
                    if (passwordMatch) {
                        const token = jwt.sign({ id: user.id }, authConfig.secretkey, {
                            expiresIn: 86400, //24h,
                        });
                        res.json({
                            message: 'Login success!',
                            accessToken: token,
                        });
                    } else {
                        res.json({
                            accessToken: null,
                            message: 'Sai mật khẩu!',
                        });
                    }
                }
            })
            .catch((err) => res.status(500).send({ message: err }));
    }
}

module.exports = new AuthController();
