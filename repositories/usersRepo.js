const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UsersRepo {
  create(options) {
    return normalizeDBQuery(db.Users.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Users.findOne(query, ''));
  }
}

module.exports = new UsersRepo();
