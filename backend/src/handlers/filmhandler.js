const axios = require('axios');

const getFilteredFilmsHandler = async (request, h) => {
  const { genres = [], contentTypes = [] } = request.payload;

  try {
    const response = await axios.post(`${process.env.ML_BASE_URL}/filter_films`, {
      genres,
      contentTypes,
    });

    return h.response({
      message: 'Filtered films',
      data: response.data,
    }).code(200);
  } catch (error) {
    return h.response({
      message: 'Gagal mengambil film dari model ML',
      error: error.message,
    }).code(500);
  }
};

module.exports = { getFilteredFilmsHandler };