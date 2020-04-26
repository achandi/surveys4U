const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//Note: cant import class model using requre statements, need to rely on mongoose

const User = mongoose.model('users');
// above creates new user class

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id is the mongo generated id, not google profile.id below, this is better if u use multiple oauth
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); //User class not user instance, assume mongoose methods return promises
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser); // if this return statement hits rest of code wont
        }
        const newUser = await new User({ googleId: profile.id }).save(); //its only on the JS side until u call .save()
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
