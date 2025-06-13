'use strict';
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genre');
const filmRoutes = require('./routes/film');
const recomendationRoutes = require('./routes/recommendation');
const optionsRoutes = require('./routes/optionsRoutes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route([...authRoutes, ...genreRoutes, ...filmRoutes, ...recomendationRoutes, ...optionsRoutes]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();