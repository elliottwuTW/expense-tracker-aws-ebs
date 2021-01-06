const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const sorts = require('../../data/sorts.json')

const query = require('../../middleware/query')

router.get('/', query(Record, 'category'), (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      const records = res.queryResult
      const totalAmount = records.reduce((acc, cur, index, arr) => {
        cur = arr[index].amount
        return acc + cur
      }, 0)

      const period = res.views.period
      const category = res.views.category || 'all'
      const sort = res.views.sort || 'date'
      // save setting to session
      req.session.query = { period, category, sort }

      return res.render('index', {
        records,
        totalAmount,
        categories,
        category,
        sorts,
        sort,
        period,
        duration: res.views.duration
      })
    })
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      res.render('new', {
        categories: categories.map((category) => category.title)
      })
    })
})

router.post('/', (req, res) => {
  const { name, date, category, merchant, amount } = req.body

  Category.findOne({ title: category })
    .then((categoryInfo) => {
      return Record.create({
        categoryTitle: categoryInfo.title,
        categoryValue: categoryInfo.value,
        categoryIcon: categoryInfo.icon,
        name,
        date,
        merchant,
        amount,
        user: req.user._id
      })
    })
    .then(res.redirect('/'))
    .catch((err) => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      Record.findOne({ _id: req.params.id, user: req.user._id })
        .lean()
        .then((record) => {
          res.render('edit', {
            record,
            date: record.date.toISOString().slice(0, 10), // yyyy-mm-dd
            categories: categories.map((category) => category.title)
          })
        })
    })
})

router.put('/:id', (req, res) => {
  Category.findOne({ title: req.body.category })
    .then((category) => {
      req.body.category = category._id
      return Record.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
    })
    .then(res.redirect('/'))
    .catch((err) => console.error(err))
})

router.delete('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id, user: req.user._id })
    .then((record) => record.remove())
    .then(res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
