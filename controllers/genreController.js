const { GenreRepo } = require('../repositories');
const { config } = require('../config');

//* Get all genres
//* @param {Object} req - Express request object
//* @param {Object} res - Express response object
//* @param {Function} next - Express next middleware function
//* @returns {Object} - Express response object
async function getGenres(req, res, next) {
  try {
    const genres = await GenreRepo.find({});
    if (genres.error)
      return res.status(400).send({ error: 'Error loading genres' });
    if (genres.data) {
      return res
        .status(200)
        .send({ success: 'Genres loaded', data: genres.data });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Create a new genre
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function createGenre(req, res, next) {
  try {
    const newGenre = await GenreRepo.create({
      _id: req.body._id,
      name: req.body.genre,
    });
    if (newGenre.error)
      return res.status(400).send({ error: 'Error creating genre' });
    if (newGenre.data) {
      return res.status(200).send({ success: 'Genre created' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getGenres, createGenre };
