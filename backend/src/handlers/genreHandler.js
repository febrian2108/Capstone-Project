const axios = require('axios');

const genreHandler = async (request, h) => {
  try {
    const response = await axios.get(`${process.env.ML_BASE_URL}/genres`);
    return h.response(response.data).code(200);
  } catch (err) {
    return h.response({
      status: 'error',
      message: 'Gagal mengambil genre dari model ML',
      error: err.message
    }).code(500);
  }
};

module.exports = { genreHandler };