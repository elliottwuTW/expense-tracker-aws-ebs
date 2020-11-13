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

  const seederPromise = (data) => {
    return new Promise((resolve, reject) => {
      if (data) {
        resolve(Category.insertMany(data))
      } else {
        reject(new Error('seed data not found'))
      }
    })
  }

  seederPromise(categories)
    .then((promise) => db.close())
    .then(() => console.log('Category seeds created successfully!'))
    .catch((err) => console.error(err))
})
