const passport = require('passport');
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    async (req, res) => {
      try {
        res.redirect('/surveys');
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.get('/api/logout/', async (req, res) => {
    try {
      req.logout(); //passport automatically attaches logout() method to req object, and other properties
      res.redirect('/'); // will return empty screen because logged out above
    } catch (err) {
      console.log(err);
    }
    //and then going to /api/current_user, u will have a empty screen as well (until u authentcation flow again)
  });

  app.get('/api/current_user', async (req, res) => {
    try {
      // console.log(req.session);
      res.send(req.user);
    } catch (err) {
      console.log(err);
    } //passport automatically attaches user property to req object, and other properties
  });
};
