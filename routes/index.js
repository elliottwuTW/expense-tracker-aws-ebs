const express = require('express')
const router = express.Router()

// Include the route modules
const home = require('./modules/home.js')
const records = require('./modules/records.js')
const users = require('./modules/users')
const fbAuth = require('./modules/fbAuth')

const authenticator = require('../middleware/auth')

// Routing
router.use('/auth/facebook', fbAuth)
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

// Export
module.exports = router
