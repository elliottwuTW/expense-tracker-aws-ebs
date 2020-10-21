/**
 * respond a render of filtered records
 */
const calculateTotalAmount = require('../models/calculateTotalAmount.js')
const sortList = require('../models/sorts.json')
const periodList = require('../models/periods.json')

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
