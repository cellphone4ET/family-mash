const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, TEST_DATABASE_URL} = require('./config');

const familyMemberRouter = require('./familyMemberRouter');
const app = express();

//serve public assets
app.use(express.static('public'));

//morgan middleware
app.use(morgan('common'));
app.use(express.json());


// start server
let server;

function runServer(TEST_DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(TEST_DATABASE_URL, err => {
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

// `closeServer` function is here in original code

if (require.main === module) {
  runServer(TEST_DATABASE_URL).catch(err => console.error(err));
};

module.exports = app;
