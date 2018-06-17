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


// start/close server
if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;
