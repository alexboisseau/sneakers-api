const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/api/sneakers', (req, res, next) => {
  axios.get('htpp:')

  return res.json({sneakers})
})

app.listen(5000)

// http://localhost:5000/api/sneakers