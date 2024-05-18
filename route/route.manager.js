const userRoute = require('./v1/user.route');
const authRoute = require('./v1/auth.route');
const helloRoute = require('./v1/hello.route');
const botRoute = require('./v1/bot.route');
const transactionRoute = require('./v1/transaction.route');

const routeManager = (app) => {

    // API V1 Routes
    app.use('/v1/', helloRoute);
    app.use('/v1/auth', authRoute);
    app.use('/v1/user', userRoute);
    app.use('/v1/bot', botRoute);
    app.use('/v1/transaction', transactionRoute);

}

module.exports = routeManager;