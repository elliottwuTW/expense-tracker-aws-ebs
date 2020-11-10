const express = require('express')
const router = express.Router()

const passport = require('passport')

// sent for users' approval
router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// callback to fetch user data and back to verify
router.get('/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
