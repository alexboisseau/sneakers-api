const express = require('express')
const { check } = require('express-validator')

const sneakersController = require('../controllers/sneakers')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

// /api/sneakers
router.get('/', sneakersController.getSneakers)
router.get('/:brand', sneakersController.getSneakersByBrand)

router.use(checkAuth)

router.get('/user/:uid', sneakersController.getSneakersByUserId)

router.post(
  '/add',
  [
    check('name').not().isEmpty(),
    check('brand').not().isEmpty(),
    check('price').isNumeric()
  ],
  sneakersController.addSneaker
)
router.delete('/:sneakerId', sneakersController.deleteSneaker)

module.exports = router
