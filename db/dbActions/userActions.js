const db = require('../models');
const standardization = require('../../utils/standardization');

class UserAction {
  create(options) {
    return standardization(db.User.create(options));
  }
  findOne(query, options) {
    return standardization(db.User.findOne(query, options));
  }
  find(query, options) {
    return standardization(db.User.find(query, options));
  }
  findOneAndUpdate(filter, update, conditions) {
    return standardization(
      db.User.findOneAndUpdate(filter, update, conditions)
    );
  }
}

module.exports = new UserAction();