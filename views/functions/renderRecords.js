/**
 * respond a render of filtered records
 */
const sortList = {
  date: '日期',
  amount: '金額'
}
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
