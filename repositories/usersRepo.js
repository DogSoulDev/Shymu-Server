const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UsersRepo {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, '-__v'));
  }
}

module.exports = new UsersRepo();
