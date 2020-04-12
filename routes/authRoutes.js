const passport = require('passport');
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(); //passport automatically attaches logout() method to req object, and other properties
    res.send(req.user); // will return empty screen because logged out above
    //and then going to /api/current_user, u will have a empty screen as well (until u authentcation flow again)
  });

  app.get('/api/current_user/', (req, res) => {
    // console.log(req.session);
    res.send(req.user); //passport automatically attaches user property to req object, and other properties
  });
};
