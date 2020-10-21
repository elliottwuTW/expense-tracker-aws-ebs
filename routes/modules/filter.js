const express = require('express')

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getPeriodRecords = require('../../models/getPeriodRecords.js')
const getDuration = require('../../models/getDuration.js')
const renderRecords = require('../../views/renderRecords.js')

const router = express.Router()

router.get('/', (req, res) => {
  const { period, sort, category } = req.query
  let findCondition = {}
  let sortCondition = {}

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categoryObjs => {
      if (category === 'all') {
        findCondition = {}
      } else {
        findCondition = { categoryValue: category }
      }
      // set sort condition
      switch (sort) {
        case 'date':
          sortCondition = { date: 'desc' }
          break

        case 'amount':
          sortCondition = { amount: 'desc' }
          break

        default:
          sortCondition = { date: 'desc' }
          break
      }

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
