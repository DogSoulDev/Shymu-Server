const { auth, logger } = require('../services');

//* This is a multi-line Google style docstring.
async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
    const userClaims = await auth.verifyAuthToken(bearerToken);
    await auth.login(req, userClaims);
    next();
  } catch (error) {
    logger.debug(error);
    res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
