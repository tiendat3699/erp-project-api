const authRouter = require('./Auth.route');
const usersRouter = require('./Users.route');
const projectsRouter = require('./Projects.route');
const customersRouter = require('./Customer.route');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/projects', projectsRouter);
    app.use('/api/customers', customersRouter);
}

module.exports = route;
