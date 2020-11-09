const express = require('express')
const router = express.Router()

// Include the route modules
const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users')

// Routing
router.use('/users', users)
router.use('/records', records)
router.use('/', home)

// Export
module.exports = router
