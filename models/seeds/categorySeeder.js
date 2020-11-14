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

db.once('open', async () => {
  try {
    console.log('Ready for category seeds!')

    await Category.insertMany(categories)
    await db.close()

    console.log('Category seeds created successfully!')
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
