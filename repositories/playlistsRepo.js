const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlaylistsRepo {
  create(options) {
    return normalizeDBQuery(db.Playlists.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Playlists.find(query, '-__v'));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlists.findOne(query, '-__v'));
  }

  findById(id) {
    return normalizeDBQuery(db.Playlists.findById(id, '-__v'));
  }
}

module.exports = new PlaylistsRepo();
