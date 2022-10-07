const { UsersRepo } = require('../repositories');

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UsersRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: 'Page not found or File not found!',
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: 'The request has succeeded!',
        error: null,
      });
    }

    await UsersRepo.create({
      firebase_id: uid,
      email: email,
    });

    res.status(201).send({
      data: 'Request has succeeded and has led to the creation of a resource!',
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: 'The request has succeeded!',
    error: null,
  });
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
};
