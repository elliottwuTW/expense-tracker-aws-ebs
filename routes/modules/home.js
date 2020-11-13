const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getFilterCondition = require('../../models/functions/getFilterCondition.js')
const getPeriodRecords = require('../../models/functions/getPeriodRecords.js')
const getDuration = require('../../models/functions/getDuration.js')
const renderRecords = require('../../views/functions/renderRecords.js')

// root
router.get('/', (req, res) => {
  const {
    findCondition,
    sortCondition,
    period,
    sort,
    category
  } = getFilterCondition(req.user, req.session.query)

  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categoryObjs) => {
      Record.find(findCondition)
        .lean()
        .sort(sortCondition)
        .then((records) => {
          const duration = getDuration(period)
          records = getPeriodRecords(records, period)
          renderRecords(
            res,
            records,
            categoryObjs,
            category,
            sort,
            period,
            duration
          )
        })
    })
})

module.exports = router
