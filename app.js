// modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose.js')
const routes = require('./routes/index.js')

// settings
const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  extname: '.hbs',
  helpers: {
    ifEquals: function (targetItem, iteratedItem, options) {
      return (targetItem === iteratedItem) ? options.fn(this) : options.inverse(this)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// routing
app.use(routes)

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})
