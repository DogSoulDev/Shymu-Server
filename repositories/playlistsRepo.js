const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlaylistsRepo {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Playlist.find(query, '-__v'));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlist.findOne(query, '-__v'));
  }

  findById(id) {
    return normalizeDBQuery(db.Playlist.findById(id, '-__v'));
  }
}

module.exports = new PlaylistsRepo();
