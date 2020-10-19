const express = require('express')

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const calculateTotalAmount = require('../../models/calculateTotalAmount.js')

const router = express.Router()

router.get('/', (req, res) => {
  const category = req.query.category

  Category.find()
    .lean()
    .then(categories => {
      if (category === 'all') {
        Record.find()
          .lean()
          .then(records => {
            res.render('index', { totalAmount: calculateTotalAmount(records), categories, targetCategory: category, records })
          })
      } else {
        Record.find({ categoryValue: category })
          .lean()
          .then(records => {
            res.render('index', { totalAmount: calculateTotalAmount(records), categories, targetCategory: category, records })
          })
      }
    })
})

module.exports = router
