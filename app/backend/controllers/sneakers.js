const axios = require('axios')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Sneaker = require('../models/sneaker')
const User = require('../models/user')

const getSneakers = async (req, res, next) => {
  try {
    const sneakers = await axios
      .get('https://api.thesneakerdatabase.com/v1/sneakers?limit=50')
      .then(({ data }) => data.results)

    res.json({ sneakers })
  } catch (error) {
    return next(error)
  }
}

const getSneakersByBrand = async (req, res, next) => {
  const { brand } = req.params

  try {
    const sneakers = await axios
      .get(
        `https://api.thesneakerdatabase.com/v1/sneakers?limit=50&brand=${brand}`
      )
      .then(({ data }) => data.results)

    res.json({ sneakers })
  } catch (error) {
    return next(error)
  }
}

const getSneakersByUserId = async (req, res, next) => {
  const { uid } = req.params

  let sneakers
  try {
    sneakers = await Sneaker.find({ creator: uid })
  } catch (err) {
    return next(
      new HttpError('Impossible de trouver des sneakers pour cet ID.', 500)
    )
  }

  if (!sneakers || sneakers.length === 0) {
    return next(new HttpError('Aucune sneakers pour cette user ID', 404))
  }

  res.json({
    sneakers: sneakers.map(sneaker => sneaker.toObject({ getters: true }))
  })
}

const addSneaker = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les champs sont invalides.', 422))
  }

  const { name, brand, price } = req.body

  const createdSneaker = new Sneaker({
    name,
    brand,
    price,
    created_at: new Date().getTime(),
    creator: req.userData.userId
  })

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    return next(new HttpError("Problème lors de l'ajout de la sneaker.", 500))
  }

  if (!user) {
    return next(new HttpError('Utilisateur introuvable.', 404))
  }

  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    await createdSneaker.save({ session })
    user.sneakers.push(createdSneaker)
    await user.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError('Création de la sneaker impossible', 500))
  }

  res.status(201).json({ sneaker: createdSneaker })
}

const deleteSneaker = async (req, res, next) => {
  const { sneakerId } = req.params

  let sneaker
  try {
    sneaker = await Sneaker.findById(sneakerId).populate('creator')
  } catch (err) {
    return next(new HttpError('Impossible de trouver une sneaker', 500))
  }

  if (!sneaker) {
    return next(
      new HttpError('Impossible de trouver une sneaker pour cet ID', 404)
    )
  }

  if (sneaker.creator.id !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cette action", 401)
    )
  }

  try {
    const session = await mongoose.startSession()

    session.startTransaction()
    await sneaker.remove({ session })
    sneaker.creator.sneakers.pull(sneaker)
    await sneaker.creator.save({ session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError('Impossible de supprimer cette sneaker', 500))
  }

  res.status(200).json({ message: 'La sneaker a bien été supprimée' })
}

exports.getSneakers = getSneakers
exports.getSneakersByBrand = getSneakersByBrand
exports.getSneakersByUserId = getSneakersByUserId
exports.addSneaker = addSneaker
exports.deleteSneaker = deleteSneaker
