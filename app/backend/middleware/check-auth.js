const jwt = require('jsonwebtoken')

const HttpError = require('../models/http-error')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      throw new Error("Problème lors de l'authentication")
    }

    const decodedToken = jwt.verify(token, 'alex-thomas-jwt')

    req.userData = { userId: decodedToken.userId }
    next()
  } catch (err) {
    return next(new HttpError("Problème lors de l'authentication", 403))
  }
}
