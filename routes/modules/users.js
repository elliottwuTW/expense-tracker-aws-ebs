const express = require('express')
const router = express.Router()
const passport = require('passport')

const { getLoginPage, logout, getRegisterPage, register } = require('../../controllers/users')

router.get('/login', getLoginPage)
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/records',
    failureRedirect: '/users/login'
  })
)
router.get('/logout', logout)
router.get('/register', getRegisterPage)
router.post('/register', register)

module.exports = router
