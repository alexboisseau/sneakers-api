const express = require('express')
const bodyParser = require('body-parser')

const HtppError = require('./models/http-error')
const sneakersRoutes = require('./routes/sneakers')

const app = express()

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/sneakers', sneakersRoutes)

app.use((req, res, next) => {
  throw new HtppError('Cette route n\'existe pas.', 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res.status(error.code || 500).json({message: error.message || 'Une erreur s\'est produite.'})
})

app.listen(5000)