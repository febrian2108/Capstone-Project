const { recommendFilms } = require('../handlers/recommendationHandler.js');
const authenticate = require('../utils/authenticate.js'); // tanpa destructuring {}

const recommendationRoutes = [
  {
    method: 'POST',
    path: '/recommend',
    handler: recommendFilms,
    options: {
      pre: [{ method: authenticate }],
    },
  }
   
];

module.exports = recommendationRoutes;
