const mongoose = require('mongoose')
const mongodbURL = 'mongodb://localhost/expense-tracker'

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })

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
