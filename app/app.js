const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("../config/keys");

require("../models/Product");
require("../models/User");
require("../models/Guest");
require("../authentication/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

require("../routes/authRoutes")(app);
require("../routes/supplierRoutes")(app);
require("../routes/queries")(app);

app.listen(8081, function() {
  console.log("NODE server listening on port 8081!");
});
