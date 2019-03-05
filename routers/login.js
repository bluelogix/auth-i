const loginRouter = require('express').Router();
const logoutRouter = require('express').Router();

const bcrypt = require('bcryptjs');
const session = require('express-session'); 

const db = require('./config.js');
const Users = require('./users-model.js');


const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60, // in ms
    secure: false, // used over https only
  },
  httpOnly: true, // cannot access the cookie from js using document.cookie
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically
  
};


loginRouter.use(session(sessionConfig)); 
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

  logoutRouter.get('/api/logout', (req, res) => {
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


module.exports = loginRouter, logoutRouter;