var express = require('express');
var router = express.Router();
const {
  asyncHandler,
  handleValidationErrors,
  csrfProtection
} = require('./utils');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');
const { loginUser, logoutUser, requireAuth } = require('../auth');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // return all list from userId
    const { userId } = req.session.auth;

    res.render('index');
  })
);
module.exports = router;
