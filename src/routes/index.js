const authRouter = require('./Auth');
const userRouter = require('./User');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
}

module.exports = route;
