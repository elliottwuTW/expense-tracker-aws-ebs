// modules
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv')

// Environment vars
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

require('./config/mongoose.js')
const routes = require('./routes/index.js')
const setViewEngine = require('./config/viewEngine')
const usePassport = require('./config/passport')
const localVar = require('./middleware/localVar')

const app = express()
const PORT = process.env.PORT

setViewEngine(app)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
usePassport(app)
app.use(flash())
app.use(localVar)

app.use(routes)

// Error handling
app.use((err, req, res, next) => {
  console.error(err)
  return res.status(500).render('error')
})

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})
