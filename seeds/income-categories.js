const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const db = require('../config/mongoose.js')
const categories = require('../data/income-categories.json')
const Category = require('../models/category.js')

db.once('open', async () => {
  try {
    console.log('Ready for seeds!')
    await Category.insertMany(categories)
    await db.close()
    console.log('All income categories added...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
