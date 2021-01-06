const Category = require('../models/category')

const getThisMonth = require('../utils/getThisMonth')
const getDateRange = require('../utils/getDateRange')

module.exports = (model, populate) => (req, res, next) => {
  const conditions = {}

  // read the setting
  const period = req.query.period || (req.session.query ? req.session.query.period : null) || getThisMonth()
  const categoryValue = req.query.categoryValue || (req.session.query ? req.session.query.categoryValue : null)
  const sort = req.query.sort || (req.session.query ? req.session.query.sort : null)

  // period
  const { minDate, maxDate } = getDateRange(period)
  conditions.date = { $gte: minDate, $lte: maxDate }

  // category
  Category.findOne({ value: categoryValue })
    .lean()
    .then(category => {
      if (category !== null && category.value !== 'all') {
        conditions.category = category._id
      }

      // model query
      const query = model.find(conditions).populate(populate).lean()

      // sort
      const sortStr = sort ? ('-' + sort) : '-date'
      return query.sort(sortStr)
    })
    .then(results => {
      res.queryResult = results
      // for rendering
      res.views = {}
      res.views.period = period
      res.views.categoryValue = categoryValue
      res.views.sort = sort
      res.views.duration = { minDate, maxDate }

      next()
    })
    .catch(err => console.error(err))
}
