const db = require('../models');
const { TracksRepo } = require('../repositories');
const { cloudinary } = require('../services/cloudinary/index');
const { getPublicId } = require('../services/cloudinary/cloudinaryUtils');
const { config } = require('../config');

//* Uploads a new track to the database
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function uploadTrack(req, res, next) {
  const { name, genre } = req.body;
  try {
    //*Upload audio to cloudinary
    const uploadedAudio = cloudinary.uploader.upload(req.files.track[0].path, {
      resource_type: 'video',
      folder: '//!Add the folder of cloudinary',
    });
    //*Upload thumbnail to cloudinary
    const uploadedImage = cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      {
        resource_type: 'image',
        folder: '//!Add the folder of cloudinary',
      }
    );
    //*Uploads finish
    const uploads = await Promise.all([uploadedAudio, uploadedImage]);
    const audio = uploads[0];
    const image = uploads[1];
    //*Define the response data schema
    const trackSchema = {
      _id: audio.asset_id,
      url: audio.secure_url,
      userId: req.headers._id,
      thumbnail: image.secure_url,
      name: name,
      genre: genre,
    };
    //*Create the new track
    const newTrack = await TracksRepo.create(trackSchema);
    if (newTrack.error) {
      return res.status(400).send({ error: 'Error uploading your track' });
    }
    //*Filter the new list of updated tracks uploaded by the logged user and add it to the server response
    if (newTrack.data) {
      const updatedTracks = await TracksRepo.find(
        { userId: req.headers._id },
        { _id: 1, name: 1, thumbnail: 1, genre: 1 }
      );
      const tracks = getTracksWithGenres(updatedTracks.data);
      return res.status(201).send({
        success: 'Your track has successfully uploaded',
        data: tracks,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//*  It takes a list of tracks and returns a list of tracks with the genre name and genre id added to
//*  each track.
//*  @param listOfTracks - [{
//*  @returns An array of objects.
function getTracksWithGenres(listOfTracks) {
  const tracks = listOfTracks.map((track) => {
    return {
      _id: track._id,
      name: track.name,
      thumbnail: track.thumbnail,
      genre: track.genre.name,
      genreId: track.genre._id,
    };
  });
  return tracks;
}

//*A function that is used to get a track.
async function getTrack(req, res, next) {
  try {
    const foundTrack = await TracksRepo.findOne({
      _id: req.params.id,
      userId: req.headers._id,
    });
    if (foundTrack.error) {
      return res.status(400).send({ error: 'Error searching your track' });
    }
    if (foundTrack.data) {
      return res.status(200).send({
        success: 'Track found',
        data: {
          _id: foundTrack.data._id,
          name: foundTrack.data.name,
          thumbnail: foundTrack.data.thumbnail,
          genre: {
            _id: foundTrack.data.genre._id,
            name: foundTrack.data.genre.name,
          },
        },
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Get all tracks of the user
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function getMyTracks(req, res, next) {
  try {
    const findingTracks = await TracksRepo.find(
      { userId: req.headers._id },
      {
        _id: 1,
        name: 1,
        thumbnail: 1,
        url: 1,
        likedBy: 1,
        userId: 1,
      }
    );
    if (findingTracks.error) {
      return res.status(400).send({ error: 'Error loading your tracks' });
    }
    const tracks = findingTracks.data.map((track) => {
      return {
        _id: track._id,
        name: track.name,
        thumbnail: track.thumbnail,
        genre: track.genre.name,
        user: { _id: track.userId._id, userName: track.userId.userName },
        like: track.likedBy.includes(req.headers._id) ? true : false,
      };
    });
    if (findingTracks.data) {
      return res.status(200).send({
        success: 'Your tracks have been loaded',
        data: tracks,
      });
    }
    next();
  } catch (error) {
    error.message = error.message || 'Error loading your tracks';
  }
}

//* Edit a track
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function editTrack(req, res, next) {
  const { id } = req.params;
  const { name, genre } = req.body;
  const trackSchema = { name: name, genre: genre };
  try {
    const track = await TracksRepo.findOne(
      { _id: id },
      { _id: 1, name: 1, genre: 1, thumbnail: 1 }
    );
    const thumbnail = track.data.thumbnail;
    //*If thumbnail existes, delete it from cloudinary
    if (req.file) {
      const publicId = await getPublicId(thumbnail);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: 'image',
        });
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'image',
          folder: 'tracks-thumbnails-dev',
        });
        trackSchema.thumbnail = uploadedImage.secure_url;
      }
    }
    const updatedTrack = await TracksRepo.findByIdAndUpdate(id, trackSchema, {
      new: true,
    });
    if (updatedTrack.error) {
      return res.status(400).send({ error: 'Error updating your track' });
    }
    if (updatedTrack.data) {
      const updatedTracks = await TracksRepo.find({ userId: req.headers._id });
      const tracks = getTracksWithGenres(updatedTracks.data);
      return res.status(200).send({
        success: `Track ${updatedTrack.data.name} updated`,
        data: tracks,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Deletes a track from the database and cloudinary.
//* @param {Object} req - The request object.
//* @param {Object} res - The response object.
//* @param {Function} next - The next middleware function in the stack.
//* @returns {Object} - The response object.
async function deleteTrack(req, res, next) {
  const id = req.params['id'];
  try {
    const track = await TracksRepo.findOne(
      { _id: id },
      { url: 1, thumbnail: 1 }
    );
    const url = track.data.url;
    const thumbnail = track.data.thumbnail;
    //*Deletes sound from cloudinary.
    const publicId = getPublicId(url); //*Get the public id from the url.
    const destroyTrack = cloudinary.uploader.destroy(publicId, {
      resource_type: 'video',
    });
    //*Deletes thumnail from cloudinary
    const publicIdThumbnail = getPublicId(thumbnail); //*Get the public id from the thumbnail url.
    const destroyThumbnail = cloudinary.uploader.destroy(publicIdThumbnail, {
      resource_type: 'image',
    });
    await Promise.all([destroyTrack, destroyThumbnail]);
    const deleteTrack = await TracksRepo.deleteOne({
      _id: id,
      userId: req.headers._id,
    });
    const updatedTracks = await TracksRepo.find({ userId: req.headers._id });
    const tracks = getTracksWithGenres(updatedTracks.data);
    if (deleteTrack.error) {
      return res.status(400).send({ error: 'Error deleting your track' });
    }
    if (deleteTrack.data) {
      return res
        .status(200)
        .send({ success: 'Your track has been deleted', data: tracks });
    }
    next();
  } catch (err) {
    next(err);
  }
  next();
}

//* Get liked tracks
//* @param {Object} req - Request object
//* @param {Object} res - Response object
//* @param {Function} next - Next middleware function
//* @returns {Object} - Response object
async function getLikedTracks(req, res, next) {
  try {
    const tracks = await TracksRepo.find(
      { likedBy: req.headers._id },
      { _id: 1, name: 1, url: 1, thumbnail: 1, userId: 1 }
    );
    if (tracks.error) {
      res.status(400).send({ error: 'Error deleting your track' });
      return;
    }
    if (tracks.data) {
      const filteredTracks = tracks.data.map((track) => {
        return {
          _id: track._id,
          name: track.name,
          thumbnail: track.thumbnail,
          genre: track.genre.name,
          owner: track.userId === req.headers._id ? true : false,
          user: { _id: track.userId._id, userName: track.userId.userName },
        };
      });
      return res
        .status(200)
        .send({ success: 'Liked tracks', data: filteredTracks });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Like a track
//* @param {Object} req - Express request object
//* @param {Object} res - Express response object
//* @param {Function} next - Express next middleware function
//* @returns {Object} - JSON response
async function likeTrack(req, res, next) {
  try {
    const id = req.params.id;
    const userId = req.headers._id;
    const updateLike = await TracksRepo.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            likedBy: {
              $cond: {
                if: { $in: [userId, '$likedBy'] },
                then: { $setDifference: ['$likedBy', [userId]] },
                else: { $concatArrays: ['$likedBy', [userId]] },
              },
            },
          },
        },
      ],
      { new: true }
    );
    if (updateLike.error) {
      return res.status(400).send({ error: 'Error deleting your track' });
    }
    if (updateLike.data) {
      const like = updateLike.data.likedBy.includes(userId) ? true : false;
      return res.status(200).send({
        success: like
          ? 'You like a new track'
          : 'You do not like a track anymore',
        data: { _id: updateLike.data._id, like: like },
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
    next(error);
  }
}

//* This function is used to play a track
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function playTrack(req, res, next) {
  try {
    const track = await TracksRepo.find({ _id: req.params.id });
    if (track.error) {
      return res.status(400).send({ error: 'Can not load your track' });
    }
    if (track.data) {
      const { _id, name, thumbnail, url } = track.data[0];
      return res.status(200).send({
        success: 'Track found',
        data: {
          _id: _id,
          name: name,
          thumbnail: thumbnail,
          url: url,
        },
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      data: error.message,
    });
    next(error);
  }
}

//* Get tracks for playlist
//* @param {Object} req - Express request object
//* @param {Object} res - Express response object
//* @param {Function} next - Express next middleware function
//* @returns {Object} - JSON response object
async function getTracksForPlaylist(req, res, next) {
  try {
    const userId = req.headers._id;
    const playlistId = req.params.id;
    const playlist = await db.Playlist.findById(playlistId).populate('tracks');
    const filter = playlist.tracks.map((track) => {
      return track.trackId;
    });
    const tracks = await TracksRepo.find(
      {
        _id: { $nin: filter },
        $or: [{ userId: userId }, { likedBy: { $in: userId } }],
      },
      {
        _id: 1,
        name: 1,
        thumbnail: 1,
      }
    );
    if (tracks.error) {
      return res.status(400).send({ error: 'Error loading tracks' });
    }
    if (tracks.data) {
      return res.status(200).send({
        success: 'Tracks loaded',
        data: tracks.data,
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
  uploadTrack,
  editTrack,
  getMyTracks,
  getLikedTracks,
  likeTrack,
  deleteTrack,
  getTrack,
  playTrack,
  getTracksForPlaylist,
};
