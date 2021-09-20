var express = require('express');
var router = express.Router();
const { loginUser, logoutUser, requireAuth } = require('../auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});


module.exports = router;
