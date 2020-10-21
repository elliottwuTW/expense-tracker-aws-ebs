const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getPeriodRecords = require('../../models/getPeriodRecords.js')
const getDuration = require('../../models/getDuration.js')
const renderRecords = require('../../views/renderRecords.js')

// root
router.get('/', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryObjs => {
      Record.find()
        .lean()
        .then(records => {
          const category = 'all'
          const sort = 'date'
          const period = 'recentYear'
          const duration = getDuration(period)
          records = getPeriodRecords(records, period)
          renderRecords(res, records, categoryObjs, category, sort, period, duration)
        })
    })
})

module.exports = router
