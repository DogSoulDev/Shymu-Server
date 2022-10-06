//*Primer paso en verde.
//?Puntos a tener en cuenta.
//!Importante.
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');


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

app.listen(`${process.env.DB_PORT}`, (req, res) => {
  console.log('Server runs OK');
});
