if (process.env.NODE_ENV === 'production') {
  //we ar ein production, return prod keys
  module.exports = require('./prod');
} else {
  ///return dev keys
  module.exports = require('./dev');
}
