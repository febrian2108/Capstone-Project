
const { genres } = require('../utils/dummydata');

const genreHandler = (request, h) => {
    return h.response(genres).code(200);
};

module.exports = { genreHandler };


