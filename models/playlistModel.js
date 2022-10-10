const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PlaylistSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Playlist name is required!'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    collaborative: {
      type: Boolean,
      required: false,
      default: false,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: false,
    },
    publicAccessible: {
      type: Boolean,
      required: false,
      default: false,
    },
    numberSongs: {
      type: Number,
      default: 0,
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
    tracks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'track',
        },
      ],
      default: [],
    },
    followedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    collaborators: {
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

const Playlist = mongoose.model('playlist', PlaylistSchema);

module.exports = Playlist;
