const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const AlbumModel= mongoose.model('album', albumSchema);

module.exports = AlbumModel;
