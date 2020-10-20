const express = require('express')
const router = express.Router()

// Include the route modules
const home = require('./modules/home.js')
const filter = require('./modules/filter.js')
const records = require('./modules/records.js')

// Routing
router.use('/', home)
router.use('/filter', filter)
router.use('/records', records)

// Export
module.exports = router
