const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./config.js");
const User = require("../models/user.model.js");

const secret = config.secret;

module.exports = (passport) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      console.log("JWT Payload:", jwt_payload);
      console.log("id:" + jwt_payload._id);
      User.findOne({ _id: jwt_payload._id })
        .then((user) => {
          console.log("User:", user);
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
