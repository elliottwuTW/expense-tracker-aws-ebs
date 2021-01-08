const express = require('express')
const router = express.Router()

// Include the route modules
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const authenticator = require('../middleware/auth')

// Routing
router.use('/auth', auth)
router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', (req, res) => res.redirect('/records'))

// Export
module.exports = router
