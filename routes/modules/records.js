const express = require('express')
const router = express.Router()

const Record = require('../../models/record.js')
const Category = require('../../models/category.js')

const getFilterCondition = require('../../models/functions/getFilterCondition.js')
const getPeriodRecords = require('../../models/functions/getPeriodRecords.js')
const getDuration = require('../../models/functions/getDuration.js')
const renderRecords = require('../../views/functions/renderRecords.js')

router.get('/filter', (req, res) => {
  const {
    findCondition,
    sortCondition,
    period,
    sort,
    category,
  } = getFilterCondition(req.user, req.query)

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
  // save setting to session
  req.session.query = { period, sort, category }
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      res.render('new', {
        categories: categories.map((category) => category.title),
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
        userId: req.user._id,
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
      Record.findOne({ _id: req.params.id, userId: req.user._id })
        .lean()
        .then((record) => {
          res.render('edit', {
            record,
            date: record.date.toISOString().slice(0, 10), // yyyy-mm-dd
            categories: categories.map((category) => category.title),
          })
        })
    })
})

router.put('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .then((record) =>
      Category.findOne({ title: req.body.category }).then((categoryInfo) => {
        delete req.body.category
        Object.assign(record, req.body)

        record.categoryTitle = categoryInfo.title
        record.categoryValue = categoryInfo.value
        record.categoryIcon = categoryInfo.icon

        return record.save()
      })
    )
    .then(res.redirect('/'))
    .catch((err) => console.error(err))
})

router.delete('/:id', (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .then((record) => record.remove())
    .then(res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
