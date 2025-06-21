const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
const {
  generateToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const jwt = require("jsonwebtoken");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({
        email: profile.emails[0].value,
      });

      if (!user) {
        const newUser = await User.create({
          fullname: profile.displayName,
          email: profile.emails[0].value,
          password: jwt.sign(
            {
              note: "This is the method to log in with a google account",
            },
            process.env.JWT_SECRET
          ),
          username: profile.emails[0].value.split("@")[0],
          avatar: profile.photos[0].value,
          verifyEmail: true,
        });
        const payload = {
          id: newUser._id,
          fullname: newUser.fullname,
          username: newUser.username,
          email: newUser.email,
        };
        return done(null, {
          token: generateToken(payload),
          refreshToken: generateRefreshToken(payload),
        });
      }
      const payload = {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      };
      return done(null, {
        message: "Account already exists",
        token: generateToken(payload),
        refreshToken: generateRefreshToken(payload),
      });
    } catch (error) {
      return done(error);
    }
  }
);

const serializeUser = (user, done) => {
  done(null, user);
};

const deserializeUser = (user, done) => {
  done(null, user);
};

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use("google", googleStrategy);

module.exports = { googleStrategy };
