function signOut(req = {}) {
  req.user = null;
  req.signOut = function noop() {};
}

module.exports = {
  signOut: signOut,
};
