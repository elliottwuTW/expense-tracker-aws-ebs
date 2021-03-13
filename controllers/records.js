const { getCategoriesExclusiveType, getCategoryByTitle } = require('../db/Categories')
const { getRecordsByUserIdDateIndex, createRecord, getRecordById, updateRecordById, deleteRecordById } = require('../db/Records')

const reconstructCategories = require('../utils/reconstructCategories')
const recordsTotalAmount = require('../utils/recordsTotalAmount')
const isEmpty = require('../utils/isEmpty')

// Get monthly records
exports.getMonthlyRecords = (req, res, next) => {
  getRecordsByUserIdDateIndex(res.queryParams)
    .then(recordData => {
      const records = recordData.Items
      const totalAmount = recordsTotalAmount(records)

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
        // convert string to number
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

// Get the a specific record page
exports.getRecordPage = (req, res, next) => {
  getRecordById(req.params.id)
    .then(data => {
      const record = data.Item
      if (!record) return next(new Error('no such record'))

      const exclusiveType = (record.isIncome) ? 'expense' : 'income'
      getCategoriesExclusiveType(exclusiveType)
        .then(data => {
          const categories = data.Items
          reconstructCategories(categories)
          return res.render('edit', { record, categories, isIncome: record.isIncome })
        })
        .catch(next)
    })
    .catch(next)
}

// Update a record
exports.updateRecord = (req, res, next) => {
  getCategoryByTitle(req.body.categoryTitle)
    .then(data => {
      if (isEmpty(data.Items)) return next(new Error('no such category'))

      const category = data.Items[0]
      const isCategoryChanged = (category.id !== req.body.originalCategoryId)

      // check amount
      if (req.body.isIncome === 'false') {
        let amount = req.body.amount
        amount = '-' + amount
        req.body.amount = amount
      }

      updateRecordById(req.params.id, req.body, isCategoryChanged, category)
        .then(res.redirect('/'))
        .catch(next)
    })
    .catch(next)
}

// Delete a record
exports.deleteRecord = (req, res, next) => {
  deleteRecordById(req.params.id)
    .then(res.redirect('/'))
    .catch(next)
}
