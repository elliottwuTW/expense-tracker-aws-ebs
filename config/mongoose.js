const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

// database state
const db = mongoose.connection
db.on('error', () => {
  console.log('MongoDB for expense-tracker is error!')
})
db.once('open', () => {
  console.log('MongoDB for expense-tracker is connected!')
})

// export db for seeders to create default data
module.exports = db
