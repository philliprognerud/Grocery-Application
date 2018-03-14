const passport = require("passport");
const middleware = require("../middleware");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/auth/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.send({ success: false, message: "authentication failed" });
      } else {
        res.send({ success: true, message: "authentication succeeded" });
      }
    })(req, res, next);
  });

  app.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.post(
    "/auth/signup",
    middleware.usernameAvail,
    middleware.emailAvail,
    function(req, res, next) {
      if (req.usernameTaken || req.emailTaken) {
        res.send({
          usernameTaken: req.usernameTaken,
          emailTaken: req.emailTaken
        });
      }

      middleware.createAccount(
        req.body.username,
        req.body.password,
        req.body.email
      );

      req.login(req.body.user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
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

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
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
