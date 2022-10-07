const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class TrackRepo {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Track.find(query, '-__v'));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, '-__v'));
  }

  findById(id) {
    return normalizeDBQuery(db.Track.findById(id, '-__v'));
  }
}

module.exports = new TrackRepo();