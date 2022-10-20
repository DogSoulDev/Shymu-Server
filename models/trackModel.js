const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TrackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required!'],
      trim: true,
    },
    artists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    albums: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'playlist',
        },
      ],
      default: [],
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'genre',
    },
    url: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      trim: true,
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0.0,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    playlists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'playlist',
        },
      ],
      default: [],
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TrackModel = mongoose.model('track', TrackSchema);

module.exports = TrackModel;
