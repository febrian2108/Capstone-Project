const {  getMediaTypes } = require('../handlers/optionsHandler');

const optionsRoutes = [
  { method: 'GET', path: '/mediaTypes', handler: getMediaTypes },
];

module.exports = optionsRoutes;