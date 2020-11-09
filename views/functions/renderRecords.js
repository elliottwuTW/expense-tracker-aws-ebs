/**
 * respond a render of filtered records
 */
const calculateTotalAmount = require('../../models/functions/calculateTotalAmount')
const sortList = require('../../models/data/sorts.json')
const periodList = require('../../models/data/periods.json')

function renderRecords(res, records, categoryObjs, category, sort, period, duration) {
  res.render('index', {
    records,
    totalAmount: calculateTotalAmount(records),
    categoryObjs,
    category,
    sortList,
    sort,
    periodList,
    period,
    duration
  })
}

module.exports = renderRecords
