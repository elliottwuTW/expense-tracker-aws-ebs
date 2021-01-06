const express = require('express')
const router = express.Router()

const passport = require('passport')

// sent for users' approval
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))

// callback to fetch user data and back to verify
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
