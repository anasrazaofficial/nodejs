const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user')
const { CLIENT_ID, CLIENT_SECRET } = process.env

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
}, (accessToken, refreshToken, profile, next) => {
    console.log(profile._json.email);
    User.findOne({ email: profile._json.email }).then(user => {
        if (user) {
            console.log("User already exists in the database", user);
            next(null, user);
        } else {
            User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile._json.email
            }).then(newUser => {
                console.log(newUser)
                next(null, newUser);
            }).catch(err => console.error(err))
        }
    })
    next();
}))