const express = require('express') 
const router = express.Router()
const postsController = require('../controllers/posts')
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')
 
router.get('/', homeController.getIndex)

router.get('/login', ensureAuth, authController.getLogin)
router.post('/login', authController.postLogin) // Why do you need a POST request here?
router.get('/logout', authController.logout)

router.get('/signup', ensureAuth, authController.getSignup)
router.post('/signup', authController.postSignup) // Why do you need a POST request here?

router.get('/profile', postsController.getLogin)
router.get('/feed', postsController.getFeed)

module.exports = route