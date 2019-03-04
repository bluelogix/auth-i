const userRouter = require('express').Router();

const bcrypt = require('bcryptjs');

const db = require('./config.js');
const Users = require('./users-model.js');

//USERS WHEN LOG IN IS SUCCESSFUL 
function restricted(req, res, next) {
    const {username, password } = req.headers
    if (username && password ) {
      Users.findBy({ username }) 
      .first()
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password )) {
          next();
        } else {
          res.status(401).json({ message: 'You shall not pass!' })
        }
      }).catch(err => {
        res.status(500).json(err)
      })
    } 
  }
  userRouter.post('/', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });





module.exports = userRouter;