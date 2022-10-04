const db = require('../models');

async function searchTracks(req, res, next) {
  const _id = req.headers._id;
  try {
    const searchText = req.query?.q;

    if (!searchText) {
      return res.status(400).json({
        message: 'Search text is required',
      });
    }
    if (searchText.length < 3) {
      return res.status(400).json({
        message: 'Search text must be at least 3 characters long',
      });
    }
    if (searchText) {
      const tracks = await db.Track.find(
        {
          $or: [
            { name: { $regex: searchText, $options: 'i' } }, // i = case insensitive
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

      const playlists = await db.Playlist.find(
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

      const ownerPlaylists = playlists.map((playlist) => {
        if (playlist.userId._id === _id) {
          return { ...playlist._doc, isOwner: true };
        } else {
          return { ...playlist._doc, isOwner: false };
        }
      });

      const users = await db.User.find(
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
        users,
        playlists: ownerPlaylists,
        tracks,
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
  searchTracks,
};