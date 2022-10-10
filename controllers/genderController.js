const db = require('../models');
const { GenderRepo } = require('../repositories');

async function getGenders(req, res, next) {
  try {
    const genders = await GenderRepo.find();

    if (genders.error)
      return res.status(400).send({ error: 'Error loading genres' });

    if (genders.data) {
      return res
        .status(200)
        .send({ success: 'Gender loaded', data: gender.data });
    }

    next();
  } catch (err) {
    next(err);
  }
}

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
