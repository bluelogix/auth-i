const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const registerRouter = require('./routers/register.js');
const loginRouter = require('./routers/login.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);

server.get('/', (req, res) => {
    res.send("Auth Auth Auth!");
  });

module.exports = server;