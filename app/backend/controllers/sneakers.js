const axios = require('axios')
const HttpError = require('../models/http-error')

const getSneakers = async (req, res, next) => {
  try {
    const sneakers = await axios.get('https://api.thesneakerdatabase.com/v1/sneakers?limit=50')
      .then(({ data }) => data.results)

    res.json({ sneakers })
  } catch (error) {
    return next(error)
  }
}

const getSneakersByBrand = async (req, res, next) => {
  const { brand } = req.params

  try {
    const sneakers = await axios.get(`https://api.thesneakerdatabase.com/v1/sneakers?limit=50&brand=${brand}`)
      .then(({ data }) => data.results)

    res.json({ sneakers })
  } catch (error) {
    return next(error)
  }
}

exports.getSneakers = getSneakers
exports.getSneakersByBrand = getSneakersByBrand