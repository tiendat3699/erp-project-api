const authRouter = require('./Auth');
const usersRouter = require('./Users');
const projectsRouter = require('./Projects');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/projects', projectsRouter);
}

module.exports = route;
