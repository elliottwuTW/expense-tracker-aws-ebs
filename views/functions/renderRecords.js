/**
 * respond a render of filtered records
 */
const sortList = require('../../models/data/sorts.json')

module.exports = (res, records, categoryObjs, category, sort, period, duration) => {
  const totalAmount = records.reduce((acc, cur, index, arr) => {
    cur = arr[index].amount
    return acc + cur
  }, 0)
  return res.render('index', {
    records,
    totalAmount,
    categoryObjs,
    category,
    sortList,
    sort,
    period,
    duration
  })
}
