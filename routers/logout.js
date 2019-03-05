const logoutRouter = require('express').Router();

const bcrypt = require('bcryptjs');

const db = require('./config.js');
const Users = require('./users-model.js');

//LOG OUT USER
  logoutRouter.get('/', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send(
            'Cannot sign user out'
          );
        } else {
          res.send('Successfully signed out!');
        }
      });
    } else {
      res.end();
    }
  });


module.exports = logoutRouter;
