const express = require('express')

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getFilterCondition = require('../../models/getFilterCondition.js')
const getPeriodRecords = require('../../models/getPeriodRecords.js')
const getDuration = require('../../models/getDuration.js')
const renderRecords = require('../../views/renderRecords.js')

const router = express.Router()

router.get('/', (req, res) => {
  const { findCondition, sortCondition, period, sort, category } = getFilterCondition(req)

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryObjs => {
      Record.find(findCondition)
        .lean()
        .sort(sortCondition)
        .then(records => {
          const duration = getDuration(period)
          records = getPeriodRecords(records, period)
          renderRecords(res, records, categoryObjs, category, sort, period, duration)
        })
    })

  // save setting to cookie
  const query = { period, sort, category }
  res.cookie('query', query, { maxAge: 60 * 60 * 1000 })
})

module.exports = router
