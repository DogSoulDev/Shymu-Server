const { PlaylistsRepo } = require('../repositories');
const { handleDbResponse } = require('../repositories/utilsRepo');

async function createPlaylist(req, res, next) {
  const {
    body: { name, description, collaborative, thumbnail, tracks },
    user: { id },
  } = req;

  try {
    if (!name) {
      return res.status(400).send({
        data: null,
        error: 'Page not found or File not found!',
      });
    }

    const dbResponse = await PlaylistsRepo.create({
      name: name,
      description: description,
      thumbnail: thumbnail ? thumbnail : null,
      collaborative: collaborative ? collaborative : false,
      tracks: tracks ? tracks : [],
      authorId: id,
    });

    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylistById(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    const dbResponse = await PlaylistsRepo.findById({
      _id: id,
    });
    console.log(dbResponse);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylists(req, res, next) {
  const { params } = req;

  try {
    const dbResponse = await PlaylistsRepo.find(params);
    console.log(dbResponse);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlaylist: createPlaylist,
  fetchPlaylists: fetchPlaylists,
  fetchPlaylistById: fetchPlaylistById,
};
