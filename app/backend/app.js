const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const HtppError = require('./models/http-error')
const sneakersRoutes = require('./routes/sneakers')
const usersRoutes = require('./routes/users')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.use(bodyParser.json())

app.use('/api/sneakers', sneakersRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
  throw new HtppError("Cette route n'existe pas.", 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "Une erreur s'est produite." })
})

mongoose
  .connect(
    'mongodb+srv://boiss:HF5UJHUY3k8aY3wh@cluster0-tdkyv.mongodb.net/sneakers?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => app.listen(5000))
  .catch(error => console.log(error))
