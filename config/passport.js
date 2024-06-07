const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user.model.js');

const secret = 'nodeauthsecret';

module.exports = (passport) => {
  var opts ={}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findOne({id: jwt_payload.id}, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        done(null,user)
      }
      else{
        done(null,false)
      }
    })
  }));
}