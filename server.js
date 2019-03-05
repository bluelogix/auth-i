const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('./routers/register.js');
const loginRouter = require('./routers/login.js');
const usersRouter = require('./routers/users.js');
const logoutRouter = require('./routers/logout.js');
const db = require('./routers/config.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const session = require('express-session'); 
const KnexSessionStore = require('connect-session-knex')(session);

//GLOBAL MIDDLEWARE 
const sessionConfig = {
    name: 'config the cookie',
    secret: 'secrets are being passed in binary',
    cookie: {
      maxAge: 1000 * 60 * 60, // ms
      secure: false, 
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false, 
   
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 60, // in ms
    }),
  };
  
server.use(session(sessionConfig)); 

//ROUTES
server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', usersRouter);
server.use('/api/logout', logoutRouter);

server.get('/', (req, res) => {
    res.send("Auth Auth Auth!");
  });

module.exports = server;