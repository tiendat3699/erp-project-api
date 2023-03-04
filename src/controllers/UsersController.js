const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../config/auth');

class UsersController {
    currentUser(req, res) {
        const token = req.header('x-access-token');
        const user = req.user;
        jwt.verify(token, authConfig.secretkey, (err) => {
            if (err) {
                return res.status(401).json({
                    isError: true,
                    error: err,
                });
            } else {
                res.json({
                    user: user,
                });
            }
        });
    }

    all(req, res) {
        User.find({})
            .lean()
            .select('-password')
            .then((users) => {
                return res.json(users);
            })
            .catch((err) => {
                return res.status(400).json({ error: err });
            });
    }
}

module.exports = new UsersController();
