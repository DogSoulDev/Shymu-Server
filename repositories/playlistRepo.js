const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlaylistRepo {
  create(options) {
    return normalizeDBQuery(db.Playlists.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Playlists.find(query, ''));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlists.findOne(query, ''));
  }

  findById(id) {
    return normalizeDBQuery(db.Playlists.findById(id, ''));
  }
}

module.exports = new PlaylistRepo();
