// modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

require('./config/mongoose.js')
const routes = require('./routes/index.js')
const usePassport = require('./config/passport')

// settings
const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.PORT ? 'https://salty-mountain-97514.herokuapp.com' : 'http://localhost:'

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
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: 'expense-tracker',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
// Flash message
app.use(flash())
app.use((req, res, next) => {
  res.locals.login_error = req.flash('login_error')
  res.locals.login_success = req.flash('login_success')
  next()
})

// routing
app.use(routes)

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${URL}${PORT}!`)
})
