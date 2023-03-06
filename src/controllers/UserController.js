const User = require('../models/User');

class UserController {
    //[GET] /users/me
    currentUser(req, res) {
        const user = req.user;
        res.json({
            user: user,
        });
    }

    //[GET] /users/all
    all(req, res) {
        User.find({}, { password: 0 })
            .then((users) => {
                return res.json(users);
            })
            .catch((err) => {
                return res.status(500).json({ error: err });
            });
    }
}

module.exports = new UserController();
