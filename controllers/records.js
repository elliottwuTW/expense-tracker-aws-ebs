const Record = require('../models/record.js')
const Category = require('../models/category.js')
const sorts = require('../data/sorts.json')

// Get monthly records
exports.getMonthlyRecords = (req, res, next) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      const records = res.queryResult

      const period = res.views.period
      const categoryValue = res.views.categoryValue || 'all'
      const sort = res.views.sort || 'date'
      // save setting to cookie
      res.cookie('history', { period, categoryValue, sort })

      if (req.xhr) {
        // ajax request
        return res.json({
          status: 'success',
          data: { records }
        })
      } else {
        // browser request
        const totalAmount = records.reduce((acc, cur, index, arr) => {
          cur = arr[index].amount
          return acc + cur
        }, 0)

        return res.render('index', {
          records,
          totalAmount,
          categories,
          categoryValue,
          sorts,
          sort,
          period,
          duration: res.views.duration
        })
      }
    })
    .catch(next)
}

// Get the page that create a new expense
exports.getNewExpensePage = (req, res, next) => {
  Category.find({ type: { $ne: 'income' } })
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      return res.render('new', {
        today: new Date(),
        categories: categories.map((category) => category.title),
        isIncome: false
      })
    })
    .catch(next)
}

// Get the page that create a new income
exports.getNewIncomePage = (req, res, next) => {
  Category.find({ type: { $ne: 'expense' } })
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      // move 'else' to the bottom
      const elseIndex = categories.findIndex(category => category.value === 'else')
      const elseEl = categories.splice(elseIndex, 1)
      categories.push(elseEl[0])
      return res.render('new', {
        today: new Date(),
        categories: categories.map((category) => category.title),
        isIncome: true
      })
    })
    .catch(next)
}

// Add a record
exports.createRecord = (req, res, next) => {
  const { name, date, categoryTitle, merchant } = req.body
  const isIncome = (req.body.isIncome === 'true')
  let amount = req.body.amount
  if (!isIncome) { amount = '-' + amount }

  Category.findOne({ title: categoryTitle })
    .then((category) => {
      return Record.create({
        name,
        date,
        merchant,
        amount,
        category: category._id,
        user: req.user._id,
        isIncome
      })
    })
    .then(res.redirect('/'))
    .catch(next)
}

// Get the page that has a specific record
exports.getRecordPage = (req, res, next) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      // remove 'all' option
      categories.shift()
      return Record.findOne({ _id: req.params.id, user: req.user._id })
        .lean()
        .then((record) => {
          return res.render('edit', { record, categories })
        })
    })
    .catch(next)
}

// Update a record
exports.updateRecord = (req, res, next) => {
  Category.findOne({ title: req.body.categoryTitle })
    .then((category) => {
      // add category attribute to req.body
      req.body.category = category._id
      return Record.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
    })
    .then(res.redirect('/'))
    .catch(next)
}

// Delete a record
exports.deleteRecord = (req, res, next) => {
  Record.findOne({ _id: req.params.id, user: req.user._id })
    .then((record) => record.remove())
    .then(() => res.json({ status: 'success' }))
    .catch(next)
}
