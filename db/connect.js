const mongoose = require('mongoose');
const { CONFIG } = require('../config/config');

function connect() {
  return mongoose.connect(CONFIG.development.db.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  });
}

module.exports = connect;