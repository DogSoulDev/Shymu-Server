const { UsersRepo, TracksRepo } = require('../repositories');
const { handleDbResponse } = require('../repositories/utilsRepo');

async function createTrack(req, res, next) {
  const {
    body: { title, url, thumbnail, genre, duration = 0 },
    user: { uid },
  } = req;

  try {
    if (!title && !url) {
      res.status(400).send({
        data: null,
        error: 'Page not found or File not found!',
      });
    }

    const user = await UsersRepo.findOne({
      firebase_id: uid,
    });

    const dbResponse = await TracksRepo.create({
      title: title,
      url: url ? url : null,
      thumbnail: thumbnail ? thumbnail : null,
      duration: duration ? duration : 0,
      genre: genre ? genre : null,
      authorId: user._id,
    });

    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchTracks(req, res, next) {
  const { params } = req;

  console.log(req.headers);
  try {
    const dbResponse = await TracksRepo.find(params);
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

async function fetchTrackById(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    const dbResponse = await TracksRepo.findById(id);
    handleDbResponse(res, dbResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTrack: createTrack,
  fetchTracks: fetchTracks,
  fetchTrackById: fetchTrackById,
};
