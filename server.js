const express = require('express');
const helmet = require('helmet');

const authRouter = require('./routers/auth.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/register', authRouter);

module.exports = server;