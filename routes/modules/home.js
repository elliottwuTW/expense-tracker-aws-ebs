const express = require('express')
const router = express.Router()

// model
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const calculateTotalAmount = require('../../models/calculateTotalAmount.js')

// root
router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      Record.find()
        .lean()
        .then(records => {
          res.render('index', { totalAmount: calculateTotalAmount(records), categories, targetCategory: 'all', records })
        })
    })
})

module.exports = router
