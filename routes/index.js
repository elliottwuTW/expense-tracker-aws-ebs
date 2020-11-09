const express = require('express')
const router = express.Router()

// Include the route modules
const home = require('./modules/home.js')
const records = require('./modules/records.js')

// Routing
router.use('/', home)
router.use('/records', records)

// Export
module.exports = router
