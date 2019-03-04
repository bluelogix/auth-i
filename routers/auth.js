const router = require('express').Router();
const knex = require('knex'); 
const bcrypt = require('bcryptjs');

const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);


module.exports = router;
