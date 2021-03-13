module.exports = (req, res, next) => {
  const period = res.views.period
  const type = res.views.type
  const categoryValue = res.views.categoryValue
  res.cookie('history', { period, type, categoryValue })
  next()
}
