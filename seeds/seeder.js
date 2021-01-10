const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const db = require('../config/mongoose.js')
const categories = require('../data/categories.json')
const records = require('../data/_records.json')
const Category = require('../models/category.js')
const Record = require('../models/record.js')
const User = require('../models/user.js')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: '12345678'
}

// import seeder
const importData = () => {
  db.once('open', async () => {
    try {
      console.log('Ready for seeds!')
      // user
      const user = await User.create(SEED_USER)
      // category
      await Category.insertMany(categories)
      // record
      const recordPromise = await Promise.all(records.map(async (record) => {
        const category = await Category.findOne({
          title: record.category
        })
        record.category = category._id
        record.user = user._id
        return record
      }))
      await Record.insertMany(recordPromise)

      await db.close()

      console.log('All seeds created!!!')
      process.exit()
    } catch (err) {
      console.error(err)
    }
  })
}

// remove seeder
const deleteData = () => {
  db.once('open', async () => {
    try {
      await User.deleteMany()
      await Category.deleteMany()
      await Record.deleteMany()
      await db.close()

      console.log('All seeds deleted...')
      process.exit()
    } catch (err) {
      console.error(err)
    }
  })
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
