import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { useDispatch } from 'react-redux';
import { handleStripeToken } from '../../store/actions/user';

const Payments = (props) => {
  const dispatch = useDispatch();
  const handleStripe = (token) => dispatch(handleStripeToken(token));

  //debugger;
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 Survey Credits"
      amount={500}
      token={(token) => handleStripe(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      {props.children}
    </StripeCheckout>
  );
  //stripe default currency is USD, amount in cents, token is the token stripe sends back after details sent, not client token
  //think of token as onToken (it would make more sense)
};

export default Payments;
