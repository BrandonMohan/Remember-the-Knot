var express = require('express');
var router = express.Router();
const {
  asyncHandler,
  handleValidationErrors,
  csrfProtection
} = require('./utils');
const bcrypt = require('bcryptjs');
const db = require('../db/models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', csrfProtection, function (req, res) {
  res.render('sign-up');
});
// router.post('/signup', csrfProtection, function (req, res) {
//   res.render('sign-up');
// });

module.exports = router;
