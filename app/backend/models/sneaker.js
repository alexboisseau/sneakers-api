const mongoose = require('mongoose')

const { Schema } = mongoose

const sneakerSchema = Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Sneaker', sneakerSchema)
