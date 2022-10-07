const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class TracksRepo {
  create(options) {
    return normalizeDBQuery(db.Tracks.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Tracks.find(query, '-__v'));
  }

  findOne(query) {
    return normalizeDBQuery(db.Tracks.findOne(query, '-__v'));
  }

  findById(id) {
    return normalizeDBQuery(db.Tracks.findById(id, '-__v'));
  }
}

module.exports = new TracksRepo();
