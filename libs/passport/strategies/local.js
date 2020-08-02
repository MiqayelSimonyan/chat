const LocalStrategy = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'User is not found' });
      };

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Password is wrong' });
      };

      return done(null, user, { message: 'Welcome' });
    } catch (err) {
      console.error(err);
      done(err);
    };
  }
);