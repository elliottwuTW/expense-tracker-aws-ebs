const exphbs = require('express-handlebars')
const helpers = require('../utils/exphbsHelper')

module.exports = (app) => {
  app.engine(
    'hbs',
    exphbs({
      defaultLayout: 'layout',
      extname: '.hbs',
      helpers
    })
  )
  app.set('view engine', 'hbs')
}
