module.exports = (req, res, next) => {
  const period = res.views.period
  const categoryValue = res.views.categoryValue
  res.cookie('history', { period, categoryValue })
  next()
}
