const { getCategoriesExclusiveType } = require('../db/Categories')
const { getRecordsByGSI } = require('../db/Records')

const buildCategories = require('../utils/buildCategories')
const recordsTotalAmount = require('../utils/recordsTotalAmount')

// Get monthly records
exports.getMonthlyRecords = (req, res, next) => {
  getRecordsByGSI(res.queryParams)
    .then(recordData => {
      const records = recordData.Items

      // Get corresponding categories by type
      let exclusiveType = 'empty'
      if (req.query.type === 'expense') {
        exclusiveType = 'income'
      } else if (req.query.type === 'income') {
        exclusiveType = 'expense'
      }
      getCategoriesExclusiveType(exclusiveType)
        .then(categoryData => {
          const categories = categoryData.Items
          buildCategories(categories, 'all')

          // Response
          if (req.xhr) {
            // ajax request
            return res.json({
              status: 'success',
              data: { records, categories }
            })
          } else {
            // browser request
            const totalAmount = recordsTotalAmount(records)
            return res.render('index', {
              records,
              totalAmount,
              categories,
              categoryValue: res.views.categoryValue,
              period: res.views.period,
              duration: res.views.duration
            })
          }
        })
        .catch(next)
    })
    .catch(next)
}

// Get the page that create a new expense
exports.getNewExpensePage = (req, res, next) => {
  // Category.find({ type: { $ne: 'income' } })
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then((categories) => {
  //     buildCategories(categories)
  //     return res.render('new', {
  //       today: new Date(),
  //       categories: categories.map((category) => category.title),
  //       isIncome: false
  //     })
  //   })
  //   .catch(next)
}

// Get the page that create a new income
exports.getNewIncomePage = (req, res, next) => {
  // Category.find({ type: { $ne: 'expense' } })
  //   .lean()
  //   .sort({ _id: 'asc' })
  //   .then((categories) => {
  //     buildCategories(categories)
  //     return res.render('new', {
  //       today: new Date(),
  //       categories: categories.map((category) => category.title),
  //       isIncome: true
  //     })
  //   })
  //   .catch(next)
}

// Add a record
exports.createRecord = (req, res, next) => {
  // const { name, date, categoryTitle, merchant } = req.body
  // const isIncome = (req.body.isIncome === 'true')
  // let amount = req.body.amount
  // if (!isIncome) { amount = '-' + amount }

  // Category.findOne({ title: categoryTitle })
  //   .then((category) => {
  //     return Record.create({
  //       name,
  //       date,
  //       merchant,
  //       amount,
  //       category: category._id,
  //       user: req.user._id,
  //       isIncome
  //     })
  //   })
  //   .then(res.redirect('/'))
  //   .catch(next)
}

// Get the page that has a specific record
exports.getRecordPage = (req, res, next) => {
  // Record.findOne({ _id: req.params.id, user: req.user._id })
  //   .lean()
  //   .then(record => {
  //     const type = record.isIncome ? { $ne: 'expense' } : { $ne: 'income' }
  //     return Category.find({ type }).lean().sort({ _id: 'asc' })
  //       .then(categories => {
  //         buildCategories(categories)
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
