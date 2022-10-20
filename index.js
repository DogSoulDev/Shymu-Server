const mongoose = require('mongoose');
const { config } = require('./config');
const { app } = require('./app');

//!Check if logger is OK called this way from config:
mongoose.connect(`${config.server.db.url}`, (err, req) => {
  try {
    if (err) {
      throw err;
    } else {
      // console.log('Connection to Mongodb OK!');
      config.server.logger.info('Connection to Mongodb OK!');
    }
  } catch (error) {
    config.server.logger.error('Error connecting to Mongodb!');
  }
});

app.listen(`${config.server.app.port}`, (req, res) => {
  config.server.logger.info('Server runs OK');
});
