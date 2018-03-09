const passport = require("passport");
// const middleware = require("../middleware");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

module.exports = app => {
  app.post(
    "/auth/local",
    passport.authenticate("local", { failureRedirect: "/" }),
    function(req, res) {
      console.log(req.user);
      res.redirect("/");
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    function(req, res) {
      console.log(req.user);
      res.redirect("/success");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/success", (req, res) => {
    res.send("Everything is done. Please close this window!");
  });
};
