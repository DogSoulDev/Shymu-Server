const db = require('../models');
const standardization = require('../../utils/standardization');

class TrackAction {
  create(options) {
    return standardization(db.Track.create(options));
  }
  find(filter, options) {
    return standardization(
      db.Track.find(filter, options)
        .populate('genre', ['_id', 'name'])
        .populate('userId', ['_id', 'userName'])
    );
  }
  findOne(filter, options) {
    return standardization(
      db.Track.findOne(filter, options).populate('genre')
    );
  }
  findByIdAndUpdate(filter, data, conditions) {
    return standardization(
      db.Track.findByIdAndUpdate(filter, data, conditions).populate('genre')
    );
  }
  deleteOne(options) {
    return standardization(db.Track.deleteOne(options));
  }

  findOneAndDelete(options) {
    return standardization(db.Track.findOneAndDelete(options));
  }
}

module.exports = new TrackAction();