const rootHandler = (request, h) => {
    return {
        status: 'success',
        message: 'Welcome to the API',
        version: '1.0.0',
        endpoints: {
            auth: '/login, /register, /profile',
            films: '/films',
            genres: '/genres',
            recommendations: '/recommendations'
        }
    };
};

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: rootHandler
    }
]; 