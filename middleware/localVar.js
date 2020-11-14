module.exports = (req, res, next) => {
  res.locals.login_error = req.flash('login_error')
  res.locals.login_success = req.flash('login_success')
  res.locals.logout_success = req.flash('logout_success')
  res.locals.access_warning = req.flash('access_warning')

  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
}
