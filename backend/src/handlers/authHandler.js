const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, JWT_SECRET } = require('../data/data');

const registerHandler = async (request, h) => {
    const { username, email, password, confirmPassword, country, age } = request.payload;

    if (!username || !email || !password || !confirmPassword || !country || !age) {
        return h.response({ error: 'All fields are required (including country and age)' }).code(400);
    }

    if (password.length < 8) {
        return h.response({ error: 'Password must be at least 8 characters long' }).code(400);
    }

    if (password !== confirmPassword) {
        return h.response({ error: 'Passwords do not match' }).code(400);
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return h.response({ error: 'Email already registered' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword,
        country,
        age,
    };
    users.push(newUser);

    return h.response({
        message: 'User registered successfully',
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            country: newUser.country,
            age: Number(newUser.age) 
        }
    }).code(201);
};

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
        country: user.country,
        age: Number(user.age) 
    }, JWT_SECRET, { expiresIn: '5h' });

    return h.response({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            country: user.country,
            age: user.age,
        },
    });
};

const getProfileHandler = async (request, h) => {
    const { id } = request.pre.auth;
    const user = users.find(user => user.id === id);

    if (!user) {
        return h.response({ error: 'User not found' }).code(404);
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        country: user.country,
    };
};



const editingProfileHandler = async (request, h) => {
   const { id } = request.pre.auth;
    const { username, email, country, age } = request.payload;

    const user = users.find(user => user.id === id);
    if (!user) {
        return h.response({ error: 'User not found' }).code(404);
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (country) user.country = country;
    if (age) user.age = age;

    return h.response({
        message: 'Profile updated successfully',
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            country: user.country,
            age: user.age,
        },
    });
}

const changePasswordHandler = async (request, h) => {
    const { currentPassword, newPassword, confirmNewPassword } = request.payload;
    const { id } = request.pre.auth;

    const user = users.find(u => u.id === id);
    if (!user) {
        return h.response({ error: 'User not found' }).code(404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return h.response({ error: 'Current password is incorrect' }).code(401);
    }

    if (newPassword.length < 8) {
        return h.response({ error: 'New password must be at least 8 characters long' }).code(400);
    }

    if (newPassword !== confirmNewPassword) {
        return h.response({ error: 'New passwords do not match' }).code(400);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    return h.response({ message: 'Password updated successfully' }).code(200);
};


module.exports = {
    registerHandler,
    loginHandler,
    getProfileHandler,
    editingProfileHandler,
    changePasswordHandler,
};