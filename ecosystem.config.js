module.exports = {
    apps: [{
        script  : 'app.js',
        watch   : '.',
        env_dev : {
            name                                 : 'api-blockbounce-development',
            NODE_ENV                             : 'development',
            PORT                                 : 4444,
            JWT_SECRET                           : "BlockBounceSecret",
            JWT_ACCESS_EXPIRATION_MINUTES        : 44,
            JWT_REFRESH_EXPIRATION_DAYS          : 1,
            JWT_RESET_PASSWORD_EXPIRATION_MINUTES: 44,
            JWT_VERIFY_EMAIL_EXPIRATION_MINUTES  : 44,
            SMTP_HOST                            : '',
            SMTP_PORT                            : 587,
            SMTP_USERNAME                        : '',
            SMTP_PASSWORD                        : '',
            EMAIL_FROM                           : '',
        },
        env_test: {
            name        : "api-blockbounce-test",
            PORT        : 4445,
            NODE_ENV    : "test",
            TOKEN_SECRET: "BlockBounceSecret"
        },
        env_prod: {
            name        : "api-blockbounce-prod",
            PORT        : 4446,
            NODE_ENV    : "production",
            TOKEN_SECRET: "BlockBounceSecret"
        },
    }],
};