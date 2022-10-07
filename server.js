const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('.');


mongoose.connect(`${process.env.DB_MONGODB}`, (err, req) => {
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
