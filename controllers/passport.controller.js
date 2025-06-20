const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });
};

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, async (request, accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
            const newUser = await User.create({
                fullname: profile.displayName,
                email: profile.emails[0].value,
                password: jwt.sign({ note: "This is the method to log in with a google account" }, process.env.JWT_SECRET), // Using JWT to create a dummy password
                username: profile.emails[0].value.split('@')[0],
                avatar: profile.photos[0].value,
                verifyEmail: true,
            });
            return done(null, { token: generateToken(newUser), refreshToken: generateRefreshToken(newUser) });
        }
        return done(null, { token: generateToken(user), refreshToken: generateRefreshToken(user) });
    } catch (error) {
        return done(error);
    }
});


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