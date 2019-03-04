const router = require('express').Router();
const knex = require('knex'); 
const bcrypt = require('bcryptjs');

const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);


router.post('/api/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
  
    db.insert(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  


module.exports = router;
