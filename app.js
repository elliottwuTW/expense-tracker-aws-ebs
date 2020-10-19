// modules
const express = require('express')

// app
const app = express()

// settings
const PORT = process.env.PORT || 3000

// middleware

// routing
app.get('/', (req, res) => {
  res.send('hello!')
})

// start and listen to the server
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`)
})
