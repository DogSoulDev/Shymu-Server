const mongoose = require('mongoose');
const db = require('../models');

function getBaseGenres() {
  return [
    {
      _id: '1',
      name: 'blues',
    },
    {
      _id: '2',
      name: 'chill-out',
    },
    {
      _id: '3',
      name: 'hip-hop',
    },
    {
      _id: '4',
      name: 'k-pop',
    },
    {
      _id: '5',
      name: 'merengue',
    },
    {
      _id: '6',
      name: 'metal',
    },
    {
      _id: '7',
      name: 'pop',
    },
    {
      _id: '8',
      name: 'regueton',
    },
    {
      _id: '9',
      name: 'rock',
    },
    {
      _id: '10',
      name: 'salsa',
    },
  ];
}

module.exports = { getBaseGenres };
