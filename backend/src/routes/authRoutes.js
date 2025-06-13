const { registerHandler, loginHandler, getProfileHandler, editingProfileHandler, changePasswordHandler } = require('../handlers/authHandler');
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
            pre: [{ method: authenticate, assign: 'auth' }],
        },
        handler: getProfileHandler,
    },
    {
        method: 'PUT',
        path: '/profile/edit',
        options: {
            pre: [{ method: authenticate, assign: 'auth' }],
        },
        handler: editingProfileHandler,
    },
    {
        method: 'PUT',
        path: '/profile/change-password',
        options: {
            pre: [{ method: authenticate, assign: 'auth' }],
        },
        handler: changePasswordHandler,
    },
    
];
