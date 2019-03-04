const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routers/auth.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/register', authRouter);
server.use('/api/login', authRouter);

module.exports = server;