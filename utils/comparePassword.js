const bcrypt = require('bcryptjs')

module.exports = (password, hashPassword) => bcrypt.compare(password, hashPassword)
