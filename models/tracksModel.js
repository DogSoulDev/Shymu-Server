const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TrackSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required!'],
      trim: true,
    },
    url: {
      type: String,
      required: false,
    },
    thumbnail: {
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
    color: {
      type: String,
      trim: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'genre',
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    artists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      ],
      default: [],
    },
    playlists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'playlists',
        },
      ],
      default: [],
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Tracks = mongoose.model('tracks', TrackSchema);

module.exports = Tracks;
