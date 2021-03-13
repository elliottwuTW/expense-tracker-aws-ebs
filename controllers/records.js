const { getCategoriesExclusiveType, getCategoryByTitle } = require('../db/Categories')
const { getRecordsByUserIdDateIndex, createRecord } = require('../db/Records')

const reconstructCategories = require('../utils/reconstructCategories')
const recordsTotalAmount = require('../utils/recordsTotalAmount')
const isEmpty = require('../utils/isEmpty')

// Get monthly records
exports.getMonthlyRecords = (req, res, next) => {
  getRecordsByUserIdDateIndex(res.queryParams)
    .then(recordData => {
      const records = recordData.Items
      const totalAmount = recordsTotalAmount(records)
      console.log('totalAmount: ', totalAmount)

      // Get corresponding categories by type
      let exclusiveType
      if (req.query.type === 'expense') {
        exclusiveType = 'income'
      } else if (req.query.type === 'income') {
        exclusiveType = 'expense'
      }
      getCategoriesExclusiveType(exclusiveType)
        .then(categoryData => {
          const categories = categoryData.Items
          // if exclusiveType, may be unsorted
          if (exclusiveType) { reconstructCategories(categories, 'keepAll') }

          return res.render('index', {
            records,
            totalAmount,
            categories,
            categoryValue: res.views.categoryValue,
            period: res.views.period,
            type: res.views.type,
            duration: res.views.duration
          })
        })
        .catch(next)
    })
    .catch(next)
}

// Get the page that create a new expense
exports.getNewExpensePage = (req, res, next) => {
  getCategoriesExclusiveType('income')
    .then(data => {
      const categories = data.Items
      reconstructCategories(categories)

      return res.render('new', {
        today: (new Date()).toISOString(),
        categories: categories.map((category) => category.title),
        isIncome: false
      })
    })
    .catch(next)
}

// Get the page that create a new income
exports.getNewIncomePage = (req, res, next) => {
  getCategoriesExclusiveType('expense')
    .then(data => {
      const categories = data.Items
      reconstructCategories(categories)

      return res.render('new', {
        today: (new Date()).toISOString(),
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
  console.log('req.body.amount: ', req.body.amount)
  console.log('typeof (req.body.amount): ', typeof (req.body.amount))
  let amount = req.body.amount
  if (!isIncome) { amount = '-' + amount }

  getCategoryByTitle(categoryTitle)
    .then(data => {
      if (isEmpty(data.Items)) return next(new Error('no such category'))
      const category = data.Items[0]
      const recordInfo = {
        name,
        // date: yyyy-mm-dd
        date: (new Date(date)).toISOString(),
        merchant,
        amount: Number(amount),
        CategoryId: category.id,
        category,
        UserId: req.user.id,
        isIncome
      }
      createRecord(recordInfo)
        .then(res.redirect('/'))
        .catch(next)
    })
    .catch(next)
}

// Get the page that has a specific record
exports.getRecordPage = (req, res, next) => {
  // Record.findOne({ _id: req.params.id, user: req.user._id })
  //   .lean()
  //   .then(record => {
  //     const type = record.isIncome ? { $ne: 'expense' } : { $ne: 'income' }
  //     return Category.find({ type }).lean().sort({ _id: 'asc' })
  //       .then(categories => {
  //         reconstructCategories(categories)
  //         return res.render('edit', { record, categories, isIncome: record.isIncome })
  //       })
  //   })
  //   .catch(next)
}

// Update a record
exports.updateRecord = (req, res, next) => {
  // Category.findOne({ title: req.body.categoryTitle })
  //   .then((category) => {
  //     // add category attribute to req.body
  //     req.body.category = category._id

  //     // check amount
  //     let amount = req.body.amount
  //     if (req.body.isIncome === 'false') {
  //       amount = '-' + amount
  //       req.body.amount = amount
  //     }

  //     return Record.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
  //       new: true,
  //       runValidators: true,
  //       useFindAndModify: false
  //     })
  //   })
  //   .then(res.redirect('/'))
  //   .catch(next)
}

// Delete a record
exports.deleteRecord = (req, res, next) => {
  // Record.findOne({ _id: req.params.id, user: req.user._id })
  //   .then((record) => record.remove())
  //   .then(() => res.json({ status: 'success' }))
  //   .catch(next)
}
