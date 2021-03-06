// modules
const express = require('express')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv')
const path = require('path')

// Environment vars
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const routes = require('./routes/index.js')
const setViewEngine = require('./config/viewEngine')
const usePassport = require('./config/passport')
const localVar = require('./middleware/localVar')

const app = express()
const PORT = process.env.PORT

setViewEngine(app)

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(cookieParser(process.env.COOKIE_SECRET, {
  httpOnly: true
}))
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
  return res.status(500).render('error', { err })
})

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})
