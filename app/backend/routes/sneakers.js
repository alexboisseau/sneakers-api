const express = require('express')

const sneakersController = require('../controllers/sneakers')

const router = express.Router()

// /api/sneakers
router.get('/', sneakersController.getSneakers)
router.get('/:brand', sneakersController.getSneakersByBrand)

module.exports = router
