//*Sign out the user.
//* @param {Object} req - The request object.
function signOut(req = {}) {
  req.user = null;
  req.signOut = function noop() {};
}

module.exports = {
  signOut: signOut,
};
