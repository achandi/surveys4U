const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
// const passport = require('passport');
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      console.log('hit to api stripe2');
      const charge = await stripe.charges.create({
        ///this makes a async rewquest to striope to create acharge for 500 cents that id
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id,
      });

      console.log(req.user);
      console.log(charge); //id starts off with ch_ as in charge    there is also a transaction id tx_
      req.user.credits += 5; //reminder: passport created the req.user param... and it has methods like save

      const user = await req.user.save(); //remember .save() is async for mongoose, and just to make sure we havew the most up to date copy, we assign it to a const

      res.send(user);
    } catch (err) {
      console.log(err + ' in api stripe!!!');
    }
  });
};
