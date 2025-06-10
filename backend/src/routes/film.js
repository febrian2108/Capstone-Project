const { getFilmsByGenre, getFilteredFilmsHandler } = require('../handlers/filmhandler');
const authenticate = require('../utils/authenticate');

const filmRoutes = [
  {
    method: 'GET',
    path: '/films/{genre}',
    handler: getFilmsByGenre,
  },
  {
    method: 'POST',
    path: '/films',
    handler: getFilteredFilmsHandler,
    options: {
      pre: [{ method: authenticate }],
    },
  },
];

module.exports = filmRoutes;
