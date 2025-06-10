const {  genreHandler } = require('../handlers/genreHandler.js');

const genreRoutes = [
  {
    method: 'GET',
    path: '/genres',
    handler: genreHandler,
  }
];

module.exports = genreRoutes;