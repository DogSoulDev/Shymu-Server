const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlaybackRepo {
  create(options) {
    return normalizeDBQuery(db.Playback.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playback.findOne(query, '-__v'));
  }
}

module.exports = new PlaybackRepo();