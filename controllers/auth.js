var User = require('../models/user')
var bcrypt = require('bcrypt')

function signup(req, res, next) {
  try {
    //var body = req.body

    bcrypt.hash(req.body.password, 5)
      .then(function (hash) {
        var newUser = new User({
          username: req.body.username,
          accountType: req.body.accountType,
          password: hash
        })
        // Store hash in your password DB.
        newUser.save(function (err, createdUser) {
          if (err) return next(e)
          console.log('user created', createdUser)
          return res.status(200).json({
            result: createdUser
          })
        });
      });


  } catch (e) {
    console.log(e)
    next(e)
  }
}

function login(req, res, next) {
  try {

    var data = req.query
    console.log('params ', data)
    if (!data.username || !data.password) {
      next({
        message: 'username or password not given',
        status: 400
      })
    }
    //console.log('..>> ', User)

    User.findOne({username: data.username}, function (err, user) {
      //console.log('.... ', err, user)
      if (err || !user) {
        next({
          message: 'username not found',
          status: 400
        })
      }

      console.log('USER FOUND ', user)

      bcrypt.compare(data.password, user.password).then(function (match) {
        if (match) {
          return res.status(200).json({
            token: user._id
          })
        }
        next({
          message: 'password dont match',
          status: 403
        })
      });

    })
  }

  catch (e) {
    console.log(e)
    next(e)
  }
}


module.exports = {
  signup: signup,
  login: login
}