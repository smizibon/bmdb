var express = require('express');
var router = express.Router();
var User = require('../models/user')
var controller = require('../controllers/movie')

var ObjectId = require('mongoose').Types.ObjectId;
/* GET users listing. */


router.use(function (req,res,next) {
  User.findOne({_id: new ObjectId(req.header('token'))}, function (err, user) {
    if(!user) {
      //console.log('....')
      return next({status: 403, message: 'no user found'})
    }
    else {
      req.user = user
      next()
    }
  })
})

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
});

// only publisher account type can post/save movie
router.post('/', controller.create)
// only user type account can rate a movie
//router.put('/:id', 'movie update')



module.exports = router;
