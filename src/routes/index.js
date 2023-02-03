const authRouter = require('./Auth');

function route(app) {
    app.use('/api/auth', authRouter);
}

module.exports = route;
