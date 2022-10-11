const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class GenderRepo {
  create(options) {
    return normalizeDBQuery(db.Gender.create(options));
  }
  find(query) {
    return normalizeDBQuery(db.Gender.find(query, ''));
  }
  findOne(query) {
    return normalizeDBQuery(db.Gender.findOne(query, ''));
  }
  findById(id) {
    return normalizeDBQuery(db.Gender.findById(id, ''));
  }
}

module.exports = new GenderRepo();
