const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');


class TrackRepo {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }
  find(query) {
    return normalizeDBQuery(db.Track.find(query, ''));
  }
  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, ''));
  }
  findById(id) {
    return normalizeDBQuery(db.Track.findById(id, ''));
  }
}

module.exports = new TrackRepo();
