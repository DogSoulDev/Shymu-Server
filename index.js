const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`${process.env.DB_MONGODB}`, (err, req) => {
  try {
    if (err) {
      throw err;
    } else {
      console.log('Connection to Database OK!');
    }
  } catch (error) {
    console.error('Error connecting to Database!');
  }
});
