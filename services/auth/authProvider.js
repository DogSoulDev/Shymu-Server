const admin = require('firebase-admin');


const {
  FB_TYPE,
  FB_PROJECT_ID,
  FB_PRIVATE_KEY_ID,
  FB_PRIVATE_KEY,
  FB_CLIENT_EMAIL,
  FB_CLIENT_ID,
  FB_AUTH_URI,
  FB_TOKEN_URI,
  FB_AUTH_PROVIDER_X509_CERT_URL,
  FB_CLIENT_X509_CERT_URL,
  FB_DATABASE_URL,
} = process.env;

const firebaseCertConfig = {
  type: FB_TYPE,
  project_id: FB_PROJECT_ID,
  private_key_id: FB_PRIVATE_KEY_ID,
  private_key: FB_PRIVATE_KEY,
  client_email: FB_CLIENT_EMAIL,
  client_id: FB_CLIENT_ID,
  auth_uri: FB_AUTH_URI,
  token_uri: FB_TOKEN_URI,
  auth_provider_x509_cert_url: FB_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: FB_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseCertConfig),
  databaseURL: FB_DATABASE_URL
});
const auth = admin.auth();

function verifyIdToken(token) {
  return auth.verifyIdToken(token);
}

module.exports = {
  verifyIdToken: verifyIdToken,
};
