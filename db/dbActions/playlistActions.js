const db = require('../models');
const standardization = require('../../utils/standardization');

class PlayListAction {
  create(query) {
    return standardization(db.Playlist.create(query));
  }
  findOne(query) {
    return standardization(db.Playlist.findOne(query, '-__v'));
  }
  find(filter, options) {
    return standardization(db.Playlist.find(filter, options));
  }
  findByIdAndUpdate(filter, query, options) {
    return standardization(
      db.Playlist.findByIdAndUpdate(filter, query, options).populate('tracks', [
        'id',
        'name',
        'thumbnail',
      ])
    );
  }
}

module.exports = new PlayListAction();