/*eslint-env node*/

// PREVIEW URL
// http://node29.codenvy.io:47458/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Pickle Rick');
});

app.listen(9000, function () {
  console.log('NODE server listening on port 9000!');
});
