//!Testing types of JWT

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(
  path.join(__dirname, '../private.key'),
  'utf8'
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../public.key'),
  'utf8'
);

const signOptions = {
  issuer: 'Mysoft corp',
  subject: 'some@user.com',
  audience: 'http://mysoftcorp.in',
  expiresIn: '12h',
  algorithm: 'RS256',
};

const verifyOptions = {
  issuer: 'Mysoft corp',
  subject: 'some@user.com',
  audience: 'http://mysoftcorp.in',
  expiresIn: '12h',
  algorithm: 'RS256',
};

const payload = {
  data1: 'Data 1',
  data2: 'Data 2',
  data3: 'Data 3',
  data4: 'Data 4',
};

const token = jwt.sign(payload, privateKey, signOptions);
console.log('Token: ', token);

const verify = jwt.verify(token, publicKey, verifyOptions);
console.log('Verify: ', verify);

const decode = jwt.decode(token, { complete: true });
console.log('Decode: ', decode);
