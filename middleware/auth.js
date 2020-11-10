module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('access_warning', 'Please login first')
    return res.redirect('/users/login')
  }
  next()
}
