const passport = require("passport");
const middleware = require("../middleware");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const Product = mongoose.model("products");

module.exports = app => {
  app.post("/auth/search", function(req, res) {
    let data = req.body.fishassholes;
    res.send({ test: "test" });
    //do whatever you want
  });

  app.post("/auth/login", async function(req, res, next) {
    passport.authenticate("local", async function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.send({ success: false, message: "authentication failed" });
      } else {
        req.login(user, err => {
          if (err) {
            next(err);
          }
        });
        res.send({ success: true, message: "authentication succeeded" });
      }
    })(req, res, next);
  });

  app.get("/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/auth/loggedin", middleware.isLoggedIn, function(req, res) {
    res.send(req.user);
  });

  app.post(
    "/auth/signup",
    middleware.usernameAvail,
    middleware.emailAvail,
    async function(req, res, next) {
      if (req.usernameTaken || req.emailTaken) {
        res.send({
          usernameTaken: req.usernameTaken,
          emailTaken: req.emailTaken,
          accountCreated: false
        });

        return next();
      }

      const newUser = await middleware.createAccount(
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.zipCode
      );

      res.send({ accountCreated: true });

      req.login(newUser, err => {
        if (err) {
          return next(err);
        }
      });
    }
  );

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    function(req, res) {
      res.redirect("/");
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
      res.redirect("/");
    }
  );
};
