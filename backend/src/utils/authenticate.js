const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../data/data');

const authenticate = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h
      .response({ error: 'Missing or invalid token' })
      .code(401)
      .takeover();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded.age !== 'number' ||
      decoded.age < 0 ||
      typeof decoded.country !== 'string' ||
      decoded.country.trim() === ''
    ) {
      return h
        .response({ error: 'Token is missing required user info (age/country)' })
        .code(403)
        .takeover();
    }

    return decoded;

  } catch {
    return h
      .response({ error: 'Invalid token' })
      .code(401)
      .takeover();
  }
};

module.exports = authenticate;
