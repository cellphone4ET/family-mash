const express = require('express');
const app = express();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080, function() {
  console.log('server running');
});


if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;
