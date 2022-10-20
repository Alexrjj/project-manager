const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController.js');

router.route('/')
  .get(homeController.index)

router.route('/login')
  .get(homeController.login);


module.exports = router;