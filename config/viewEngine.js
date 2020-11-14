const exphbs = require('express-handlebars')

module.exports = (app) => {
  app.engine(
    'hbs',
    exphbs({
      defaultLayout: 'layout',
      extname: '.hbs',
      helpers: {
        ifEquals: function (targetItem, iteratedItem, options) {
          return targetItem === iteratedItem
            ? options.fn(this)
            : options.inverse(this)
        }
      }
    })
  )
  app.set('view engine', 'hbs')
}
