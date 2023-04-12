const ExtracJwt = require('passport-jwt').ExtractJwt;
const jwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const jwtSettings = require('../constants/jwtSetting');
const {Employee} = require('../models');

const passportConfig = new jwtStrategy({
    jwtFromRequest: ExtracJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: jwtSettings.SECRET,
}, async (payload, done) => {
    try{
        const user = await Employee.findById(payload._id);

        if (!user) return done(null, false);

        return done(null, user);
    } catch (error){
        done(error, false);
    }
});

const passportConfigLocal = new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await Employee.findOne({ email });

        console.log(user);
  
        if (!user) return done(null, false);
  
        const isCorrectPass = await user.isValidPass(password);
  
        if (!isCorrectPass) return done(null, false);
  
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  );
module.exports = {
    passportConfig,
    passportConfigLocal,
};