const db = require('../models');
const { config } = require('../config');

//*Search for tracks, playlists and users.
async function searchTrack(req, res, next) {
  const _id = req.headers._id;
  try {
    const searchText = req.query?.q;
    if (!searchText) {
      return res.status(400).json({
        message: 'Write here to find your songs!',
      });
    }
    if (searchText.length < 4) {
      return res.status(400).json({
        message: 'The search is a minimum of 4 characters!',
      });
    }
    if (searchText) {
      const track = await db.Track.find(
        {
          $or: [
            { name: { $regex: searchText, $options: 'i' } },
            { genre: { $regex: searchText, $options: 'i' } },
          ],
        },
        {
          userId: 1,
          url: 1,
          name: 1,
          thumbnail: 1,
          genre: 1,
          isLiked: {
            $cond: {
              if: { $in: [_id, '$likedBy'] },
              then: true,
              else: false,
            },
          },
        }
      )
        .populate('userId', 'userName')
        .sort({ likedBy: -1 });
      const playlist = await db.Playlist.find(
        {
          $or: [
            { name: { $regex: searchText, $options: 'i' } },
            { description: { $regex: searchText, $options: 'i' } },
          ],
        },
        {
          userId: 1,
          name: 1,
          description: 1,
          thumbnail: 1,
          publicAccessible: 1,
          isFollowed: {
            $cond: {
              if: { $in: [_id, '$followedBy'] },
              then: true,
              else: false,
            },
          },
        }
      )
        .populate('userId', 'userName')
        .sort({ followedBy: -1 });
      const ownerPlaylist = playlist.map((playlist) => {
        if (playlist.userId._id === _id) {
          return { ...playlist._doc, isOwner: true };
        } else {
          return { ...playlist._doc, isOwner: false };
        }
      });
      const user = await db.User.find(
        {
          $or: [{ userName: { $regex: searchText, $options: 'i' } }],
        },
        {
          userName: 1,
          profilePicture: 1,
        }
      )
        .sort({ userName: 1 })
        .lean();
      return res.status(200).json({
        user,
        playlist: ownerPlaylist,
        track,
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

module.exports = {
  searchTrack,
};