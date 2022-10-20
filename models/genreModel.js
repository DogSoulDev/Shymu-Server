const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Genre name is required!'],
      trim: true,
    },
    popularity: {
      type: Number,
      required: false,
      default: 0.0,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tracks',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const GenreModel = mongoose.model('genre', GenreSchema);

module.exports = GenreModel;
