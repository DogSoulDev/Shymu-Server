const { signOut } = require('./signOut');
const { UserRepo } = require('../../repositories');

//*req.user = { email: userLoginInfo.email, uid: userLoginInfo.uid }
//*req.signOut = auth.signOut

async function signUp(req = {}, userLoginInfo = {}) {
  const { email, uid } = userLoginInfo;

  if (typeof email !== 'string' || typeof uid !== 'string') {
    throw new Error('Please try again!');
  }

  const user = await UserRepo.findOne({
    firebase_id: uid,
  });

  if (!user) {
    throw new Error('Invalid token!');
  }

  req.user = {
    email: email,
    id: user._id,
  };

  req.signOut = signOut;
}

module.exports = {
  signUp: signUp,
};
