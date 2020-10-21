const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getFilterCondition = require('../../models/getFilterCondition.js')
const getPeriodRecords = require('../../models/getPeriodRecords.js')
const getDuration = require('../../models/getDuration.js')
const renderRecords = require('../../views/renderRecords.js')

// root
router.get('/', (req, res) => {
  const { findCondition, sortCondition, period, sort, category } = getFilterCondition(req.cookies)

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
})

module.exports = router
