// modules
const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose.js')
const routes = require('./routes/index.js')

// app
const app = express()

// settings
const PORT = process.env.PORT || 3000

// middleware
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

// routing
app.use(routes)
// app.get('/', (req, res) => {
//   const records = [
//     {
//       category: '餐飲',
//       name: '午餐',
//       date: '2020/10/16',
//       amount: 50
//     }
//   ]
//   res.render('index', { totalAmount: 1000, records })
// })

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})
