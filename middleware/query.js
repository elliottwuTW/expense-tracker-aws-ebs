// const Category = require('../models/category')

const getThisMonth = require('../utils/getThisMonth')
const getDateRange = require('../utils/getDateRange')

module.exports = (model, populate) => (req, res, next) => {
  const conditions = {}

  // read the setting
  const type = req.query.type
  const period = req.query.period || (req.cookies.history ? req.cookies.history.period : null) || getThisMonth()
  const categoryValue = req.query.categoryValue || (req.cookies.history ? req.cookies.history.categoryValue : null)
  const sort = req.query.sort || (req.cookies.history ? req.cookies.history.sort : null)

  // type
  if (type === 'income') {
    conditions.isIncome = true
  } else if (type === 'expense') {
    conditions.isIncome = false
  }

  // period
  const { minDate, maxDate } = getDateRange(period)
  conditions.date = { $gte: minDate, $lte: maxDate }

  // // category
  // Category.findOne({ value: categoryValue })
  //   .lean()
  //   .then(category => {
  //     if (category !== null && category.value !== 'all') {
  //       conditions.category = category._id
  //     }
  //     // owner
  //     conditions.user = req.user._id

  //     // model query
  //     const query = model.find(conditions).populate(populate).lean()

  //     // sort
  //     let sortStr = sort ? ('-' + sort) : '-date'
  //     if (sortStr === '-amount' && type === 'expense') {
  //       // expense should be sorted ascending
  //       sortStr = 'amount'
  //     }
  //     return query.sort(sortStr)
  //   })
  //   .then(results => {
  //     res.queryResult = results
  //     // for rendering
  //     res.views = {}
  //     res.views.period = period
  //     res.views.categoryValue = categoryValue
  //     res.views.sort = sort
  //     res.views.duration = { minDate, maxDate }

  //     next()
  //   })
  //   .catch(err => console.error(err))
}
