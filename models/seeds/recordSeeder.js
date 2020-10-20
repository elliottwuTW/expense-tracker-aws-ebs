/**
 * Create the expense items by default
 */
const db = require('../../config/mongoose.js')
const records = require('../records.json')
const Record = require('../record.js')
const Category = require('../category.js')

db.once('open', () => {
  console.log('Ready to create record seed data!')

  // seed data
  records.forEach(record => {
    Category.findOne({ title: record.category })
      .then(categoryInfo => {
        return Record.create({
          categoryValue: categoryInfo.value,
          categoryIcon: categoryInfo.icon,
          name: record.name,
          date: record.date,
          amount: record.amount
        })
      })
      .catch(err => console.error(err))
  })

  console.log('The record seeds created successfully!')
})
