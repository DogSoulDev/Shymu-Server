const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UserRepo {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }
  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, ''));
  }
}

module.exports = new UserRepo();
