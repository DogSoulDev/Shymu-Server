const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class TrackRepo {
  create(options) {
    return normalizeDBQuery(db.Tracks.create(options));
  }
  find(query) {
    return normalizeDBQuery(db.Tracks.find(query, ''));
  }
  findOne(query) {
    return normalizeDBQuery(db.Tracks.findOne(query, ''));
  }
  findById(id) {
    return normalizeDBQuery(db.Tracks.findById(id, ''));
  }
}

module.exports = new TrackRepo();
