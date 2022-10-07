const mongoose = require('mongoose');

const { config } = require('../config')

mongoose.connect(`${config.DB_MONGODB}`, (err, req) => {
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