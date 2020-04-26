const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    keys: [keys.cookieKey], // key property used to sign or encrypt our cookie, can be any random string of characters
  })
);
app.use(passport.initialize());
app.use(passport.session());

//ORDER OF OPERATIONS MATTERS, sends back first match (lines 24-40, line 37 catch all)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV) {
  //env variable automatically set by heroku
  //make sure taht express serves up production assets, like css files and main.js
  app.use(express.static('client/build'));

  //express wil serve up the index.html file
  //if not it will serve up index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
