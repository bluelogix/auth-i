const loginRouter = require('express').Router();


const bcrypt = require('bcryptjs');

const db = require('./config.js');
const Users = require('./users-model.js');


// LOGIN USER 

loginRouter.post('/', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user
          res.status(200).json({ message: `You are logged in ${user.username}!` });
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });



module.exports = loginRouter;