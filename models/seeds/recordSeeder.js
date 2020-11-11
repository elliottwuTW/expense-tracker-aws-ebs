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

db.once('open', () => {
  console.log('Ready for record seeds!')

  brcrypt
    .genSalt(10)
    .then((salt) => brcrypt.hash(SEED_USER.password, salt))
    .then((hash) => {
      const user = Object.assign({}, SEED_USER)
      user.password = hash
      return User.create(user)
    })
    .then((user) => {
      const userId = user._id

      return Promise.all(
        Array.from({ length: SEED_RECORDS.length }).map((_, index) =>
          Category.findOne({ title: SEED_RECORDS[index].category })
            .then((categoryInfo) => {
              const createRecord = Object.assign({}, SEED_RECORDS[index])
              createRecord.userId = userId
              createRecord.categoryTitle = categoryInfo.title
              createRecord.categoryValue = categoryInfo.value
              createRecord.categoryIcon = categoryInfo.icon

              return Record.create(createRecord)
            })
            .catch((err) => console.error(err))
        )
      )
    })
    .then(() => {
      console.log('Record seeds created successfully!')
      process.exit()
    })
    .catch((err) => console.error(err))
})
