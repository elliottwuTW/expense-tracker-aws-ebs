const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = (app) => {
  // Initialize
  app.use(passport.initialize())
  app.use(passport.session())
  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, req.flash('login_error', 'User not found'))
            }

            bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(null, false, req.flash('login_error', 'Incorrect password'))
              }
              return done(null, user, req.flash('login_success', 'Login successfully'))
            })
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
      (req, accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json

        User.findOne({ email }).then((user) => {
          if (user) {
            return done(null, user, req.flash('login_success', 'Login successfully')
            )
          }

          // Create an account
          User.create({ name, email, password: Math.random().toString(36).slice(-8) })
            .then((user) =>
              done(null, user, req.flash('login_success', 'Login successfully'))
            )
            .catch((err) => done(err, null))
        })
      }
    )
  )
  // Session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
