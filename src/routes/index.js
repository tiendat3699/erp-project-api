const authRouter = require('./Auth');
const usersRouter = require('./Users');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
}

module.exports = route;
