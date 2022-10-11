const db = require('../models');
const { UserRepo, PlaylistRepo, TrackRepo } = require('../repositories');
const mongoose = require('mongoose');
const { getPublicId } = require('../services/cloudinary/cloudinaryUtils');
const { cloudinary } = require('../services/cloudinary/index');

//* Create a new playlist
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
//* @returns {Object} - The response object
async function createPlaylist(req, res, next) {
  try {
    const _id = req.headers._id;
    const thumbnail = req.file.path;
    const playlistData = {
      userId: _id,
      name: req.body.name,
      description: req.body.description,
      publicAccessible: req.body.publicAccessible,
    };
    const thumbnailPicture = await cloudinary.uploader.upload(thumbnail, {
      resource_type: 'image',
      folder: '',
    });
    playlistData.thumbnail = thumbnailPicture.secure_url;
    await db.Playlist.create(playlistData);
    if (playlistData) {
      const playlists = await db.Playlist.find(
        { userId: _id },
        {
          name: 1,
          description: 1,
          publicAccessible: 1,
          thumbnail: 1,
          followedBy: 1,
        }
      ).exec();
      return res.status(201).send({
        success: 'Playlist created!',
        data: playlists,
      });
    } else {
      return res.status(400).send({ error: 'Please try again later!' });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

//* Follow a playlist
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
//* @returns {Object} - The response object
async function followPlaylist(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UserRepo.findOne({ userId: _id });
    if (user.error) {
      return res
        .status(400)
        .send({ error: 'The user has not been found, please try again' });
    }
    if (user.data) {
      const playlistId = req.params['id'];
      const followedPlaylists = await db.Playlist.findOneAndUpdate(
        { _id: playlistId },
        [
          {
            $set: {
              followedBy: {
                $cond: {
                  if: { $in: [_id, '$followedBy'] },
                  then: { $setDifference: ['$followedBy', [_id]] },
                  else: { $concatArrays: ['$followedBy', [_id]] },
                },
              },
            },
          },
        ],
        { new: true }
      ).exec();
      if (followedPlaylists) {
        const followed = followedPlaylists.followedBy.includes(_id)
          ? true
          : false;
        res.status(200).send({
          success: followed
            ? 'Successfully followed!'
            : 'Successfully unfollowed!',
          data: { _id: _id, followed: followed },
        });
        return;
      } else {
        return res.status(400).send({ error: 'Please try again later!' });
      }
    }
    next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

//* Get all playlists
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
//* @returns {Object} - The response object
async function getAllPlaylists(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UserRepo.findOne({ _id });
    if (user.error) {
      return res
        .status(400)
        .send({ error: 'The user has not been found, please try again' });
    }
    if (user.data) {
      const followed = await db.Playlist.aggregate([
        {
          $match: { followedBy: _id },
        },
        {
          $project: {
            id: 1,
            userId: 1,
            name: 1,
            description: 1,
            thumbnail: 1,
            publicAccessible: 1,
            followedBy: 1,
            isFollowed: {
              $cond: {
                if: { $in: [_id, '$followedBy'] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]).exec();
      const owned = await db.Playlist.aggregate([
        {
          $match: { userId: _id },
        },
        {
          $project: {
            id: 1,
            userId: 1,
            name: 1,
            description: 1,
            thumbnail: 1,
            publicAccessible: 1,
            followedBy: 1,
            isFollowed: {
              $cond: {
                if: { $in: [_id, '$followedBy'] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]).exec();
      if (followed.length > 0 || owned.length > 0) {
        res.status(200).send({
          success: 'Playlists found',
          data: {
            followed,
            owned,
          },
        });
        return;
      }
      if (followed.length === 0 && owned.length === 0) {
        res.status(200).send({
          success: 'Playlists found',
          data: {
            followed: [],
            owned: [],
          },
        });
        return;
      }
    } else {
      return res.status(400).send({
        error: 'Please try again later!',
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

//* Add a track to a playlist
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
//* @returns {Object} - The response object
async function addTrack(req, res, next) {
  const playListId = mongoose.Types.ObjectId(req.params.id);
  const tracks = req.body.tracks;
  try {
    const findPlaylist = await PlaylistRepo.findOne({ _id: playListId });
    const numSongs = findPlaylist.data.numberSongs;
    const addedTrack = await PlaylistRepo.findByIdAndUpdate(
      playListId,
      {
        $inc: { numberSongs: tracks.length },
        $push: {
          tracks: tracks.map((track, idx) => {
            return {
              trackId: track,
              order: numSongs + idx,
            };
          }),
        },
      },
      {
        new: true,
      }
    );
    if (addedTrack.error) {
      return res.status(400).send({
        error: 'Your tracks could not be added to the playlist ',
      });
    }
    if (addedTrack.data) {
      return res.status(200).send({
        success: 'Track added',
        data: addedTrack.data,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Get public playlists
//* @param {Object} req
//* @param {Object} res
//* @param {Function} next
async function getPublicPlaylists(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UserRepo.findOne({ _id });
    if (user.error) {
      return res.status(400).send({ error: 'Please try again later!' });
    }
    if (user.data) {
      const publicList = await db.Playlist.aggregate([
        {
          $match: { publicAccessible: true },
        },
        {
          $project: {
            id: 1,
            userId: 1,
            name: 1,
            description: 1,
            thumbnail: 1,
            publicAccessible: 1,
            followedBy: 1,
            isFollowed: {
              $cond: {
                if: { $in: [_id, '$Followed!'] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]).exec();
      if (publicList.length > 0) {
        res.status(200).send({
          success: 'Found!',
          data: {
            publicList,
          },
        });
        return;
      } else {
        return res.status(400).send({
          error: 'Please try again later!',
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

//* Get playlist by id
//* @param {Object} req
//* @param {Object} res
//* @param {Function} next
async function getPlaylistById(req, res, next) {
  try {
    const _id = req.headers._id;
    const playlistId = req.params['id'];
    const playlistDetails = await db.Playlist.findById(
      mongoose.Types.ObjectId(playlistId),
      {
        id: 1,
        userId: 1,
        name: 1,
        description: 1,
        thumbnail: 1,
        publicAccessible: 1,
        followedBy: 1,
        isFollowed: {
          $cond: {
            if: { $in: [_id, '$followedBy'] },
            then: true,
            else: false,
          },
        },
        tracks: 1,
      }
    ).populate({
      path: 'tracks.trackId',
      populate: [{ path: 'userId' }, { path: 'genre' }],
    });
    const playlistTracks = playlistDetails.tracks.map((track) => {
      return {
        _id: track.trackId._id,
        order: track.order,
        name: track.trackId.name,
        thumbnail: track.trackId.thumbnail,
        user: {
          _id: track.trackId.userId._id,
          userName: track.trackId.userId.userName,
        },
        genre: {
          _id: track.trackId.genre._id,
          name: track.trackId.genre.name,
        },
      };
    });
    if (playlistDetails) {
      const owned = playlistDetails.userId === _id ? true : false;
      // playlistDetails.owned = owned;
      res.status(200).send({
        success: 'Found!',
        data: {
          ...playlistDetails._doc,
          owned: owned,
          tracks: playlistTracks,
        },
      });
      return;
    } else {
      return res.status(400).send({ error: 'Please try again later!' });
    }
    // next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

//* Update playlist
//* @param {Object} req
//* @param {Object} res
//* @param {Function} next
async function updatePlaylist(req, res, next) {
  const playlistId = req.params['id'];
  const { name, description, publicAccessible } = req.body;
  const playlistSchema = {
    name: name,
    description: description,
    publicAccessible: publicAccessible,
  };
  try {
    const playlist = await db.Playlist.findOne(
      { _id: playlistId },
      {
        name: 1,
        description: 1,
        thumbnail: 1,
        publicAccessible: 1,
      }
    );
    let thumbnail = playlist.thumbnail;
    if (req.file) {
      const publicId = await getPublicId(thumbnail);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: 'image',
        });
        const uploadNewImage = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'image',
          folder: '',
        });
        playlistSchema.thumbnail = uploadNewImage.secure_url;
      }
    }
    const updated = await db.Playlist.findOneAndUpdate(
      { _id: playlistId },
      playlistSchema,
      { new: true }
    );
    res.status(200).send({
      success: 'Playlist updated!',
      data: playlistSchema,
    });
    return;
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
    next(error);
  }
}

//* Delete a playlist
//* @param {Object} req - Express request object
//* @param {Object} res - Express response object
//* @param {Function} next - Express next middleware function
//* @returns {Object} - JSON response object
async function deletePlaylist(req, res, next) {
  const playlistId = req.params['id'];
  try {
    const playlist = await db.Playlist.findOne(
      { _id: playlistId },
      {
        thumbnail: 1,
      }
    );
    let thumbnail = playlist.thumbnail;
    const publicId = await getPublicId(thumbnail);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
        folder: '',
      });
    }
    const deletePlaylist = await db.Playlist.findOneAndDelete({
      _id: playlistId,
    });
    return res.status(200).send({
      success: 'Playlist deleted!',
      data: deletePlaylist.name,
    });
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
    next(error);
  }
}

//* @param {Object} req
//* @param {Object} res
//* @param {Function} next
//* @returns {Object}
async function orderTracks(req, res, next) {
  const { track, index } = req.body;
  const { id } = req.params;
  try {
    const playlist = await PlaylistRepo.findOne({ _id: id });
    const oldOrder = playlist.data.tracks.find(
      (el) => el.trackId === track
    ).order;
    const orderedList = playlist.data.tracks.map((playlistTrack) => {
      if (playlistTrack.trackId == track) {
        return { trackId: playlistTrack.trackId, order: index };
      }
      if (index < oldOrder) {
        if (playlistTrack.order >= index && playlistTrack.order <= oldOrder) {
          return {
            trackId: playlistTrack.trackId,
            order: playlistTrack.order + 1,
          };
        }
      }
      if (index > oldOrder) {
        if (playlistTrack.order <= index && playlistTrack.order >= oldOrder) {
          return {
            trackId: playlistTrack.trackId,
            order: playlistTrack.order - 1,
          };
        }
      }
      return { trackId: playlistTrack.trackId, order: playlistTrack.order };
    });
    const updatedPlaylist = await PlaylistRepo.findByIdAndUpdate(
      { _id: id },
      { tracks: orderedList },
      { new: true }
    );
    if (updatedPlaylist.error) {
      return res
        .status(400)
        .send({ error: 'Playlist could not be updated, try again later!' });
    }
    if (updatedPlaylist.data) {
      return res
        .status(200)
        .send({ success: 'Succes!', data: updatedPlaylist.data.tracks });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlaylist,
  followPlaylist,
  getAllPlaylists,
  addTrack,
  getPublicPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  orderTracks,
};
