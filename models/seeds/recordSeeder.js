/**
 * Create the expense items by default
 */
const dotenv = require('dotenv')
const brcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const db = require('../../config/mongoose.js')
const SEED_RECORDS = require('../data/records.json')
const Record = require('../record.js')
const Category = require('../category.js')
const User = require('../user.js')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: '12345678'
}

db.once('open', async () => {
  try {
    console.log('Ready for record seeds!')

    const salt = await brcrypt.genSalt(10)
    const hash = await brcrypt.hash(SEED_USER.password, salt)
    const user = { ...SEED_USER }
    user.password = hash
    const newUser = await User.create(user)

    // record
    for (let index = 0; index < SEED_RECORDS.length; index++) {
      const record = { ...SEED_RECORDS[index] }
      record.userId = newUser._id
      const categoryInfo = await Category.findOne({
        title: SEED_RECORDS[index].category
      })
      record.categoryTitle = categoryInfo.title
      record.categoryValue = categoryInfo.value
      record.categoryIcon = categoryInfo.icon
      await Record.create(record)
    }

    console.log('Record seeds created successfully!')
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
