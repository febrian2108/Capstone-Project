const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, JWT_SECRET } = require('../data/data');

const registerHandler = async (request, h) => {
    const { username, email, password, confirmPassword } = request.payload;

    if (!username || !email || !password || !confirmPassword) {
        return h.response({ error: 'All fields are required' }).code(400);
    }

    if (password !== confirmPassword) {
        return h.response({ error: 'Passwords do not match' }).code(400);
    }

    const extistingUser = users.find(user => user.email === email);
    if (extistingUser) {
        return h.response({ error: 'Email already registered' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
    };
    users.push(newUser);

    return h.response({ message: 'User registered successfully',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        }
     }).code(201);
}

const loginHandler = async (request, h) => {
    const { email, password } = request.payload;

    const user = users.find(user => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return h.response({ error: 'Invalid email or password' }).code(400);
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
    }, JWT_SECRET, { expiresIn: '1h' });

    return h.response({
        message: 'login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    });
    
};

module.exports = {
    registerHandler,
    loginHandler,
};