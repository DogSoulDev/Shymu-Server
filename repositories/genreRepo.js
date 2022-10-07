const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class GenreRepo {
  create(options) {
    return normalizeDBQuery(db.Genre.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Genre.find(query, ''));
  }

  findOne(query) {
    return normalizeDBQuery(db.Genre.findOne(query, ''));
  }

  findById(id) {
    return normalizeDBQuery(db.Genre.findById(id, ''));
  }
}

module.exports = new GenreRepo();
