const mongoose = require('mongoose');
const db = require('../models');

function getDbGenres() {
  return [
    {
      name: 'Blues',
    },
    {
      name: 'Chill-Out',
    },
    {
      name: 'Hip-Hop',
    },
    {
      name: 'K-Pop',
    },
    {
      name: 'Merengue',
    },
    {
      name: 'Metal',
    },
    {
      name: 'Pop',
    },
    {
      name: 'Regueton',
    },
    {
      name: 'Rock',
    },
    {
      name: 'Salsa',
    },
  ];
}

module.exports = { getDbGenres };
