const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};

middlewareObj.usernameAvail = async (req, res, next) => {
  await User.findOne(
    { "localAuth.username": req.body.username },
    (err, user) => {
      if (err) {
        console.log(err);
      }

      req.usernameTaken = user ? true : false;

      return next();
    }
  );
};

middlewareObj.emailAvail = async (req, res, next) => {
  await User.findOne({ "localAuth.email": req.body.email }, (err, email) => {
    if (err) {
      console.log(err);
    }

    req.emailTaken = email ? true : false;

    return next();
  });
};

middlewareObj.createAccount = async (username, password, email) => {
  await new User({
    localAuth: {
      username,
      password,
      email
    }
  }).save();

  return;
};

module.exports = middlewareObj;
