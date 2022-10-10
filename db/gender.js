const mongoose = require('mongoose');
const db = require('../models');

function getDbGenres() {
  return [
    {
      name: 'Male',
    },
    {
      name: 'Female',
    },
    {
      name: 'Agender',
    },
    {
      name: 'Bigender',
    },
    {
      name: 'Cisgender',
    },
    {
      name: 'Gender Expression',
    },
    {
      name: 'Gender Fluid',
    },
    {
      name: 'Genderqueer',
    },
    {
      name: 'Gender Variant',
    },
    {
      name: 'Mx.',
    },
    {
      name: 'Non-Binary',
    },
    {
      name: 'Passing',
    },
    {
      name: 'Third Gender',
    },
    {
      name: 'Transgender',
    },
    {
      name: 'Transgender man',
    },
    {
      name: 'Transgender woman',
    },
    {
      name: 'Two-Spirit',
    },
    {
      name: 'Ze / Hir',
    },
  ];
}

module.exports = { getDbGenres };
