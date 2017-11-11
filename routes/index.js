var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signup',auth.signup)
router.get('/login', auth.login)

module.exports = router;
