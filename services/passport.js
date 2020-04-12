const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id is the mongo generated id, not google profile.id below, this is better if u use multiple oauth
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id); //User class not user instance, assume mongoose methods return promises
  done(null, user);
});
// above creates new user class
//Note: cant import class model using requre statements, need to rely on mongoose
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // class Methods apply to whole collection
        // below method returns promises
        //need to check first if googleId was already saved:
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          console.log('user already saved');
          //         done arguement is a callback, tells passport to resume auth process
          // done method arguements:
          // done(null or err if there’s an err,  existingUser,
          done(null, existingUser);
          ///mongoose has its own id field, this gets saved as
          // below will create a record with duplicate googleId if u run again without above conditional
        } else {
          const newUser = await new User({ googleId: profile.id }).save(); //its only on the JS side until u call .save()
          done(null, newUser);
        }
        console.log(accessToken, refreshToken, profile);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
