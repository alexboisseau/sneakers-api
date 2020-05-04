const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const HttpError = require('../models/http-error')

const getUserById = async (req, res, next) => {
  const { uid } = req.params

  let user
  try {
    user = await User.findById(uid, '-password')
  } catch (err) {
    return next(new HttpError('Il y a une erreur.', 500))
  }

  res.json({ user: user.toObject({ getters: true }) })
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les champs sont invalides.', 422))
  }

  const { name, email, password } = req.body

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    return next(new HttpError("Impossible de créer l'utilisateur", 500))
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    sneakers: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    return next(new HttpError("Problème lors de l'inscription.", 500))
  }

  let token
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'alex-thomas-jwt',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Problème lor de la connexion', 500))
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let user
  try {
    user = await User.findOne({ email })
  } catch (err) {
    return next(new HttpError('Aucun utilisateur', 500))
  }

  if (!user) {
    return next(new HttpError('Les informations sont invalides', 403))
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, user.password)
  } catch (err) {
    return next(new HttpError('Impossible de faire la connexion.', 500))
  }

  if (!isValidPassword) {
    return next(new HttpError('Les informations sont invalides.', 403))
  }

  let token
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      'alex-thomas-jwt',
      { expiresIn: '1h' }
    )
  } catch (err) {
    return next(new HttpError('Problème lor de la connexion', 500))
  }

  res.json({ userId: user.id, email: user.email, token })
}

const updateUser = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new HttpError('Les champs sont invalides.', 422))
  }

  const { name, email } = req.body
  const { uid } = req.params

  let user
  try {
    user = await User.findById(uid)
  } catch (err) {
    return next(new HttpError('Il y a une erreur.', 500))
  }

  if (user.id.toString() !== req.userData.userId) {
    return next(
      new HttpError("Vous n'êtes pas autorisé à réaliser cette action", 401)
    )
  }

  user.name = name
  user.email = email

  try {
    await user.save()
  } catch (err) {
    return next(new HttpError("Problème lors de l'enregistrement", 500))
  }

  res.status(200).json({ userId: user.id, name: user.name, email: user.email })
}

const getFavoritesSneakers = async (req, res, next) => {}

exports.signup = signup
exports.login = login
exports.updateUser = updateUser
exports.getFavoritesSneakers = getFavoritesSneakers
exports.getUserById = getUserById
