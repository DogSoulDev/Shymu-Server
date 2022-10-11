const db = require('../models');
const { GenderRepo } = require('../repositories');

//* Get all genders
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function getGenders(req, res, next) {
  try {
    const genders = await GenderRepo.find();
    if (genders.error)
      return res.status(400).send({ error: 'Error loading genders' });
    if (genders.data) {
      return res
        .status(200)
        .send({ success: 'Gender loaded', data: genders.data });
    }
    next();
  } catch (err) {
    next(err);
  }
}

//* Create a new gender
//* @param {Object} req - The request object
//* @param {Object} res - The response object
//* @param {Function} next - The next middleware function in the stack
async function createGender(req, res, next) {
  try {
    const newGender = await GenderRepo.create({
      _id: req.body._id,
      name: req.body.genre,
    });
    if (newGender.error)
      return res.status(400).send({ error: 'Error creating gender' });
    if (newGender.data) {
      return res.status(200).send({ success: 'Gender loaded' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getGenders, createGender };
