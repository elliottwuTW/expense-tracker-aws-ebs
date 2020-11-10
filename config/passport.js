const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) return done(null, false, req.flash('login_error', 'User not found'))

          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) return done(null, false, req.flash('login_error', 'Incorrect password'))

              return done(null, user, req.flash('login_success', 'Login successfully'))
            })
        })
        .catch(err => done(err, null))
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
