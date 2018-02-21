/*eslint-env node*/


var express = require('express');
var app = express();

app.get('/api/phil', function (req, res) {
  res.send('Pickle Rick');
});

app.get('/api/abe', function (req, res) {
  res.send('Pickle Rick');
});

app.listen(9000, function () {
  console.log('NODE server listening on port 9000!');
});
