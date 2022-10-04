//!Tokens de Firebase.
const admin = require('firebase-admin');
const { firebase } = require('../../config/config').CONFIG.development;

admin.initializeApp({ credential: admin.credential.cert(firebase) });

const auth = admin.auth();

function verifyIdToken(token) {
  return auth.verifyIdToken(token);
}

module.exports = { verifyIdToken: verifyIdToken };