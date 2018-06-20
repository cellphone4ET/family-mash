'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
console.log(DATABASE_URL);
const familyMemberRouter = require('./familyMemberRouter');
const app = express();

//serve public assets


//morgan middleware
app.use(morgan('common'));
app.use(express.json());
app.use('/api/family-members', familyMemberRouter)
app.use(express.static('public'));

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});


// start server
let server;

function runServer(DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = { runServer, app, closeServer };
