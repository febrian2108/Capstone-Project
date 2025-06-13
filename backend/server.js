'use strict';
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const authRoutes = require('./src/routes/authRoutes');
const genreRoutes = require('./src/routes/genre');
const filmRoutes = require('./src/routes/film');
const recomendationRoutes = require('./src/routes/recommendation');
const optionsRoutes = require('./src/routes/optionsRoutes');
const rootRoutes = require('./src/routes/rootRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 9000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route([...rootRoutes, ...authRoutes, ...genreRoutes, ...filmRoutes, ...recomendationRoutes, ...optionsRoutes]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();