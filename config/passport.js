const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const isEmpty = require('../utils/isEmpty')
const comparePassword = require('../utils/comparePassword')
const { getUserById, getUserByEmail, createUser } = require('../db/Users')

// verify with third-party returned information
const verifyInformation = (req, accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json
  getUserByEmail(email)
    .then(data => {
      const users = data.Items
      if (!isEmpty(users)) return done(null, users[0], req.flash('login_success', 'Login successfully'))

      createUser({ name, email })
        .then(data => done(null, data.Item, req.flash('login_success', 'Login successfully')))
        .catch(err => done(err, null))
    })
    .catch(err => done(err, null))
}

module.exports = (app) => {
  // Initialize
  app.use(passport.initialize())
  app.use(passport.session())
  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        getUserByEmail(email)
          .then(data => {
            const users = data.Items
            if (isEmpty(users)) return done(null, false, req.flash('login_error', 'User not found'))

            comparePassword(password, users[0].password)
              .then(isMatch => {
                if (!isMatch) return done(null, false, req.flash('login_error', 'Incorrect password'))
                return done(null, users[0], req.flash('login_success', 'Login successfully'))
              })
              .catch((err) => done(err, null))
          })
          .catch((err) => done(err, null))
      }
    )
  )
  // FB Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        passReqToCallback: true,
        profileFields: ['email', 'displayName']
      },
      verifyInformation
    )
  )
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        passReqToCallback: true,
        profileFields: ['email', 'displayName']
      },
      verifyInformation
    )
  )
  // Session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then((data) => done(null, data.Item))
      .catch((err) => done(err, null))
  })
}
