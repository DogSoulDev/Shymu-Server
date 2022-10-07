const db = require('../models');
const { UsersRepo, PlaylistsRepo, TracksRepo } = require('../repositories');
const mongoose = require('mongoose')
const { getPublicId } = require('../utils/cloudinaryUtils');
const { cloudinary } = require('../services/cloudinary');

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
      folder: 'tracks-thumbnails-dev',
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
        success: 'Playlist created successfully',
        data: playlists,
      });
    } else {
      return res
        .status(400)
        .send({ error: 'The playlist has not been created, please try again' });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

async function followPlaylist(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UsersRepo.findOne({ userId: _id });
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
            ? 'You have successfully followed the playlist'
            : 'You have successfully unfollowed the playlist',
          data: { _id: _id, followed: followed },
        });
        return;
      } else {
        return res
          .status(400)
          .send({ error: 'The playlist has not been found, please try again' });
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

async function getAllPlaylists(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UsersRepo.findOne({ _id });
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
        error: 'The playlists have not been found, please try again',
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

async function addTrack(req, res, next) {
  const playListId = mongoose.Types.ObjectId(req.params.id);
  const tracks = req.body.tracks;

  try {
    const findPlaylist = await PlaylistsRepo.findOne({ _id: playListId });

    const numSongs = findPlaylist.data.numberSongs;

    const addedTrack = await PlaylistsRepo.findByIdAndUpdate(
      playListId,
      {
        $inc: { numberSongs: tracks.length },
        // $push: { tracks: { trackId: tracks[0],order:11 } },

        $push: {
          tracks: tracks.map((track, idx) => {
            return {
              trackId: track,
              order: numSongs + idx,
            };
          }),
        },
      },
      // { $inc: { order: 1 } },
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

async function getPublicPlaylists(req, res, next) {
  try {
    const _id = req.headers._id;
    const user = await UsersRepo.findOne({ _id });
    if (user.error) {
      return res
        .status(400)
        .send({ error: 'The user has not been found, please try again' });
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

      if (publicList.length > 0) {
        res.status(200).send({
          success: 'Playlists found',
          data: {
            publicList,
          },
        });
        return;
      } else {
        return res.status(400).send({
          error: 'The playlists have not been found, please try again',
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
        success: 'Playlist found',
        data: {
          ...playlistDetails._doc,
          owned: owned,
          tracks: playlistTracks,
        },
      });
      return;
    } else {
      return res
        .status(400)
        .send({ error: 'The playlist has not been found, please try again' });
    }

    // next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
    next(error);
  }
}

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
          folder: 'tracks-thumbnails-dev',
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
      success: 'Playlist updated',
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
        folder: 'tracks-thumbnails-dev',
      });
    }
    const deletePlaylist = await db.Playlist.findOneAndDelete({
      _id: playlistId,
    });
    return res.status(200).send({
      success: 'Playlist deleted',
      data: deletePlaylist.name,
    });
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
    next(error);
  }
}

async function orderTracks(req, res, next) {
  const { track, index } = req.body;

  const { id } = req.params;
  try {
    const playlist = await PlaylistsRepo.findOne({ _id: id });

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

    const updatedPlaylist = await PlaylistsRepo.findByIdAndUpdate(
      { _id: id },
      { tracks: orderedList },
      { new: true }
    );
    if (updatedPlaylist.error) {
      return res
        .status(400)
        .send({ error: 'The playlist could not be updated' });
    }

    if (updatedPlaylist.data) {
      return res
        .status(200)
        .send({ success: 'SUCCESS', data: updatedPlaylist.data.tracks });
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
