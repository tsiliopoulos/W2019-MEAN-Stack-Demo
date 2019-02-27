const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const UserModel = require('../models/user');
const DB = require('../config/db');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = DB.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    UserModel.User.findById()
    UserModel.User.getUserById(jwt_payload.data._id, (err, user) => {
      console.log("user: " + user);
      if(err) {
        return done(err, false);
      }
      if(user) {
        console.log(user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
