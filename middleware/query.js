const getThisMonth = require('../utils/getThisMonth')
const getDateRange = require('../utils/getDateRange')
const isEmpty = require('../utils/isEmpty')

const { getCategoryByValue } = require('../db/Categories')

module.exports = (req, res, next) => {
  const params = {}

  // read the setting
  const type = req.query.type || 'all'
  const period = req.query.period || (req.cookies.history ? req.cookies.history.period : null) || getThisMonth()
  const categoryValue = req.query.categoryValue || (req.cookies.history ? req.cookies.history.categoryValue : null) || 'all'

  // period
  const { minDate, maxDate } = getDateRange(period)
  params.KeyConditionExpression = 'UserId = :userId AND #date BETWEEN :minDate AND :maxDate'
  params.ExpressionAttributeNames = { '#date': 'date' }
  params.ExpressionAttributeValues = {
    ':userId': req.user.id,
    ':minDate': minDate,
    ':maxDate': maxDate
  }

  // type
  if (type === 'income') {
    params.FilterExpression = 'isIncome = :true'
    params.ExpressionAttributeValues[':true'] = 'true'
  } else if (type === 'expense') {
    params.FilterExpression = 'isIncome = :false'
    params.ExpressionAttributeValues[':false'] = 'false'
  }

  getCategoryByValue(categoryValue)
    .then(data => {
      if (isEmpty(data.Items)) return next(new Error('no such category'))

      const category = data.Items[0]
      if (category.value !== 'all') {
        const previousFilterExpression = params.FilterExpression
        params.FilterExpression = (previousFilterExpression)
          ? (previousFilterExpression + ' AND CategoryId = :categoryId')
          : 'CategoryId = :categoryId'
        params.ExpressionAttributeValues[':categoryId'] = category.id
      }

      res.queryParams = params
      // parameters for render
      res.views = {}
      res.views.period = period
      res.views.type = type
      res.views.categoryValue = categoryValue
      res.views.duration = { minDate, maxDate }
      next()
    })
    .catch(next)
}
