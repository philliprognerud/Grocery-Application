var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Pickle Rick");
});

app.listen(8081, function() {
  console.log("NODE server listening on port 8081!");
});
