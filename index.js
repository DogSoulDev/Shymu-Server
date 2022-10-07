const mongoose = require('mongoose');
const { config } = require('./config');
const { app } = require('./app');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`${config.development.db.url}`, (err, req) => {
  try {
    if (err) {
      throw err;
    } else {
      console.log('Connection to Mongodb OK!');
    }
  } catch (error) {
    console.error('Error connecting to Mongodb!');
  }
});

app.listen(`${config.development.app.port}`, (req, res) => {
  console.log('Server runs OK');
});
