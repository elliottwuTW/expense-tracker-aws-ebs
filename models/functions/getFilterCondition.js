function getFilterCondition(filterObj) {
  // read from filterObj
  const query = filterObj.query
  const category = (query === undefined ? null : query.category) || 'all'
  const sort = (query === undefined ? null : query.sort) || 'date'
  const period = (query === undefined ? null : query.period) || 'recentYear'

  const findCondition = category === 'all' ? {} : { categoryValue: category }

  let sortCondition = {}
  switch (sort) {
    case 'date':
      sortCondition = { date: 'desc' }
      break

    case 'amount':
      sortCondition = { amount: 'desc' }
      break

    default:
      break
  }

  return { findCondition, sortCondition, period, sort, category }
}

module.exports = getFilterCondition
