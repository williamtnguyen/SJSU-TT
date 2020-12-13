const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const Brother = mongoose.model('Brothers');

const fs = require('fs');
const { SecretOrKey } = JSON.parse(
  fs.readFileSync(`${__dirname}/secrets.json`)
);

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = SecretOrKey;

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line camelcase
    new JwtStrategy(options, (jwt_payload, done) => {
      Brother.findById(jwt_payload.id)
        .then((brother) => {
          // User exists and is authenticated
          if (brother) {
            return done(null, brother);
          }
          return done(null, false);
        })
        .catch((error) => {
          throw new Error(error);
        });
    })
  );
};
