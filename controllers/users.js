const isEmpty = require('../utils/isEmpty')
const { getUserByEmail, createUser } = require('../db/Users')

// Login Page
exports.getLoginPage = (req, res) => {
  return res.render('login')
}

// Logout
exports.logout = (req, res) => {
  req.logout()
  req.flash('logout_success', 'Logout successfully')
  return res.redirect('/users/login')
}

// Register Page
exports.getRegisterPage = (req, res) => {
  return res.render('register')
}

// Register
exports.register = (req, res, next) => {
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

  getUserByEmail(email)
    .then((data) => {
      const users = data.Items
      if (!isEmpty(users)) {
        registerErrors.push({ msg: 'Email is already registered' })
        return res.render('register', { registerErrors, name, email })
      }

      createUser({ name, email, password })
        .then((_) => res.redirect('/users/login'))
        .catch(next)
    })
    .catch(next)
}
