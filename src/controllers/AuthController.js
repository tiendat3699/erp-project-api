const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
    signup(req, res) {
        const user = new User({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
    }

    login(req, res) {}
}

module.exports = new AuthController();
