const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const request = require("request-promise");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Local Authentication
passport.use(
  new LocalStrategy(async function(username, password, done) {
    const existingUser = await User.findOne({ "localAuth.username": username });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({
      localAuth: {
        username: username,
        password: password
      }
    }).save();

    return done(null, user);
  })
);

//Facebook Authentication
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookID,
      clientSecret: keys.facebookSecret,
      callbackURL:
        "https://a07cae693dbc4ff0b97e09bfc02303fc.vfs.cloud9.us-west-2.amazonaws.com:8081/auth/facebook/callback",
      profileFields: ["id", "name", "email"]
    },
    async function(accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({
        "facebookAuth.id": profile.id
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        facebookAuth: {
          id: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        }
      }).save();

      return done(null, user);
    }
  )
);
