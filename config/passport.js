const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const bcrypt = require('bcryptjs')

// verified function with third-party returned information
const verifiedFunction = (req, accessToken, refreshToken, profile, done) => {
  const { name, email } = profile._json
  return done(null, { id: 'test-id', name, email }, req.flash('login_success', 'Login successfully'))
  // User.findOne({ email }).then((user) => {
  //   if (user) {
  //     return done(null, user, req.flash('login_success', 'Login successfully')
  //     )
  //   }

  //   // Create an account
  //   User.create({ name, email, password: Math.random().toString(36).slice(-8) })
  //     .then((user) =>
  //       done(null, user, req.flash('login_success', 'Login successfully'))
  //     )
  //     .catch((err) => done(err, null))
  // })
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
        return done(null, { id: 'test-id', name: 'test-user', email }, req.flash('login_success', 'Login successfully'))
        // User.findOne({ email })
        //   .then((user) => {
        //     if (!user) {
        //       return done(null, false, req.flash('login_error', 'User not found'))
        //     }

        //     bcrypt.compare(password, user.password).then((isMatch) => {
        //       if (!isMatch) {
        //         return done(null, false, req.flash('login_error', 'Incorrect password'))
        //       }
        //       return done(null, user, req.flash('login_success', 'Login successfully'))
        //     })
        //   })
        //   .catch((err) => done(err, null))
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
      verifiedFunction
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
      verifiedFunction
    )
  )
  // Session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    return done(null, { id: 'test-id', name: 'test-user', email: 'test-email' })
    // User.findById(id)
    //   .lean()
    //   .then((user) => done(null, user))
    //   .catch((err) => done(err, null))
  })
}
