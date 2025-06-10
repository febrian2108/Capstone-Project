// handlers/optionsHandler.js
const { mediaTypes } = require('../utils/dummydata');


const getMediaTypes = (request, h) => {
  return h.response(mediaTypes).code(200);
};


module.exports = { getMediaTypes };