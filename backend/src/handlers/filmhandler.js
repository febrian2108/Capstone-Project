const { films } = require('../utils/dummydata');

const getFilmsByGenre = (request, h) => {
  const { genre } = request.params;

  if (!genre) {
    return h
      .response({ status: 'fail', message: 'Genre parameter is required' })
      .code(400);
  }

  const genreLower = genre.toLowerCase();
  const filtered = films.filter(f =>
    f.genres.some(g => g.toLowerCase() === genreLower)
  );

  return h.response(filtered.slice(0, 10)).code(200);
};

const getFilteredFilmsHandler = (request, h) => {
  const payload = request.payload || {};

  const genreFilters = (payload.genres || []).map(g => g.toLowerCase());
  const contentTypes = (payload.contentTypes || []).map(c => c.toLowerCase());

  const filtered = films.filter(f => {
    const matchesGenre =
      genreFilters.length === 0 ||
      f.genres.some(g => genreFilters.includes(g.toLowerCase()));

    const matchesType =
      contentTypes.length === 0 ||
      contentTypes.includes(f.mediaType.toLowerCase());

    return matchesGenre && matchesType;
  });

  return h.response({
    message: 'Filtered films',
    data: filtered,
  }).code(200);
};

module.exports = {
  getFilmsByGenre,
  getFilteredFilmsHandler,
};
