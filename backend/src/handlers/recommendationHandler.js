const axios = require('axios');

const recommendFilms = async (request, h) => {
  const { watched = [] } = request.payload;

  try {
    const response = await axios.post(`${process.env.ML_BASE_URL}/predict`, {
      titles: watched,
    });

    const recommendationsRaw = response.data[0]?.recommendations || [];

    const recommendations = recommendationsRaw.filter((rec) => {
      const title = rec.title?.trim().toLowerCase();
      return !watched.some(
        (watchedTitle) =>
          watchedTitle.trim().toLowerCase() === title
      );
    });


    return h.response({
      message: 'Rekomendasi dari model ML berhasil',
      watched,
      recommendations,
    }).code(200);

  } catch (error) {
    console.error(error);
    return h.response({
      message: 'Gagal mengambil rekomendasi dari model ML',
      error: error.message,
    }).code(500);
  }
};

module.exports = { recommendFilms };
