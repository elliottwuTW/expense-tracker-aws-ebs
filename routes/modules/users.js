const express = require('express')
const router = express.Router()

const passport = require('passport')

const User = require('../../models/user')

// Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// Logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('logout_success', 'Logout successfully')
  res.redirect('/users/login')
})

// Register Page
router.get('/register', (req, res) => {
  res.render('register')
})

// Register
router.post('/register', (req, res) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  // check
  const registerErrors = []
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    registerErrors.push({ msg: 'Email not valid' })
  }
  if (password.length < 8) {
    registerErrors.push({
      msg: 'Password can not be shorter than 8 characters'
    })
  }
  if (password !== confirmPassword) {
    registerErrors.push({ msg: 'Please check the passwords' })
  }

  if (registerErrors.length > 0) {
    return res.render('register', { registerErrors, name, email })
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      registerErrors.push({ msg: 'Email is already registered' })
      return res.render('register', { registerErrors, name, email })
    }

    // Create an user
    User.create({ name, email, password })
      .then((_) => res.redirect('/users/login'))
      .catch((err) => console.error(err))
  })
})

module.exports = router
