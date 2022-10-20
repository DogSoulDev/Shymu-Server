const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');


class PlaylistRepo {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }
  find(query) {
    return normalizeDBQuery(db.Playlist.find(query, ''));
  }
  findOne(query) {
    return normalizeDBQuery(db.Playlist.findOne(query, ''));
  }
  findById(id) {
    return normalizeDBQuery(db.Playlist.findById(id, ''));
  }
}

module.exports = new PlaylistRepo();
