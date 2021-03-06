const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const server = express();
const db = require('../notes/notesModel');
var cors = require('cors');

// Set up a whitelist and check against it:
var whitelist = ['https://ielvisd.github.io', 'localhost:3000'];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Then pass them to cors:
// Then use it before your routes are set up:

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

// function authenticate(req, res, next) {
//   const { authentication: token } = req.headers;
//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       res.status(401).json({ message: 'Authentication failed.' });
//     } else {
//       req.locals = { authorization: decoded };
//       next();
//     }
//   });
// }

// server.use('/restricted/', authenticate);

//Enable Cross Origin Requests Might make this limited to my own Domain if it works
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const notesRouter = require('../notes/notesRouter.js');
const registerRouter = require('../notes/registerRouter.js');
const loginRouter = require('../notes/loginRouter.js');

//sanity check endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

//Register Endpoints
server.get('/test', registerRouter);
server.post('/register', registerRouter);

//Login Endpoints
server.get('/logintest', loginRouter);
server.post('/login', loginRouter);

//Notes Endpoints/Methods
server.get('/notes', notesRouter);
server.get('/notes/all', notesRouter);
server.get('/notes/allTest/:userId', notesRouter);
server.post('/notes/create', notesRouter);
server.delete('/notes/delete/:noteId', notesRouter);
server.put('/notes/edit/:noteId', notesRouter);

module.exports = server;
