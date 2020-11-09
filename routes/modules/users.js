const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  // check
  const registerErrors = []
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    registerErrors.push({ msg: 'Email not valid' })
  }
  if (password.length < 8) {
    registerErrors.push({ msg: 'Password can not be shorter than 8 characters' })
  }
  if (password !== confirmPassword) {
    registerErrors.push({ msg: 'Please check the passwords' })
  }

  if (registerErrors.length > 0) {
    return res.render('register', { registerErrors, name, email })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        registerErrors.push({ msg: 'Email is already registered' })
        return res.render('register', { registerErrors, name, email })
      }

      // Create an user
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(_ => res.redirect('/users/login'))
        .catch(err => console.error(err))
    })
})

module.exports = router
