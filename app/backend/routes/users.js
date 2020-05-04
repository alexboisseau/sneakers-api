const express = require('express')
const { check } = require('express-validator')

const usersController = require('../controllers/users')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

// api/users
router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').not().isEmpty()
  ],
  usersController.signup
)

router.post('/login', usersController.login)

router.use(checkAuth)

router.patch(
  '/:uid',
  [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail()],
  usersController.updateUser
)

module.exports = router
