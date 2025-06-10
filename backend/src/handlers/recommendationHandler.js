const { films } = require('../utils/dummydata');

const recommendFilms = async (request, h) => {
  const {
    watched = [],
    genres = [],
    contentTypes = [],
  } = request.payload;

  const allUnwatched = films.filter(f => !watched.includes(f.title));

  const mockMLResponse = allUnwatched.map(f => ({
    title: f.title,
    similarity: Number((Math.random() * 0.2 + 0.8).toFixed(2)), 
  }));

  const gFilters = genres.map(g => g.toLowerCase());
  const tFilters = contentTypes.map(t => t.toLowerCase());

  const recommendations = mockMLResponse
    .map(({ title, similarity }) => {
      const film = films.find(f => f.title === title);
      if (!film) return null;

      const matchesGenre =
        gFilters.length === 0 ||
        film.genres.some(g => gFilters.includes(g.toLowerCase()));
      const matchesType =
        tFilters.length === 0 ||
        tFilters.includes(film.mediaType.toLowerCase());

      return matchesGenre && matchesType
        ? {
            title,
            similarity,
            genres: film.genres,
            mediaType: film.mediaType,
          }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10);

  return h.response({
    message: 'Rekomendasi dummy berdasarkan model ML',
    watched,
    recommendations,
  }).code(200);
};

module.exports = { recommendFilms };
