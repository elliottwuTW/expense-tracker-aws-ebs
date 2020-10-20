const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

// create-record page
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
      // remove 'all' option
      categories.shift()
      res.render('new', { categories: categories.map(category => category.title) })
    })
})
// add a record
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body

  Category.findOne({ title: category })
    .then(categoryInfo => {
      return Record.create({
        categoryValue: categoryInfo.value,
        categoryIcon: categoryInfo.icon,
        name,
        date,
        amount
      })
    })
    .then(res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
