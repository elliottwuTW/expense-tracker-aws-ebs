/**
 * Set the default categories
 */
const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const db = require('../../config/mongoose.js')
const categories = require('../data/categories.json')
const Category = require('../category.js')

db.once('open', () => {
  console.log('Ready for category seeds!')

  // seed data
  const promise = []
  categories.forEach((category, index) => {
    promise.push(
      Category.create({
        title: category.title,
        value: category.value,
        icon: category.icon
      })
    )
  })
  // waiting for all promise to be finished and disconnect db
  Promise.all(promise)
    .then(() => db.close())
    .then(() => console.log('Category seeds created successfully!'))
    .catch((err) => console.error(err))
})
