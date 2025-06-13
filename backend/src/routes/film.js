const { getFilteredFilmsHandler } = require('../handlers/filmHandler');
const authenticate = require('../utils/authenticate');

const filmRoutes = [
  {
  method: 'POST',
  path: '/films/filter',
  handler: getFilteredFilmsHandler,
  options: {
    pre: [{ method: authenticate }],
  },
}

];

module.exports = filmRoutes;
