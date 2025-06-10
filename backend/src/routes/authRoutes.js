const { registerHandler, loginHandler, editingProfileHandler, changePasswordHandler } = require('../handlers/authHandler');
const authenticate = require('../utils/authenticate');

module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: registerHandler,
    },
    {
        method: 'POST',
        path: '/login',
        handler: loginHandler,
    },
    {
        method: 'GET',
        path: '/profile',
        options: {
            pre: [{ method: authenticate }],
        },
        handler: (request) => {
            return {
                message: 'User profile data',
                user: request.auth.credentials,
            };
        },
    },
    {
        method: 'PUT',
        path: '/profile/edit',
        options: {
            pre: [{ method: authenticate }],
        },
        handler: editingProfileHandler,
    },
    {
        method: 'PUT',
        path: '/profile/change-password',
        options: {
            pre: [{ method: authenticate }],
        },
        handler: changePasswordHandler,
    },
    
];
