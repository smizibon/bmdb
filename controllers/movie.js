var User = require('../models/user')
var Movie = require('../models/movie')

var ObjectId = require('mongoose').Types.ObjectId;
//var query = { campaign_id: new ObjectId(campaign._id) };

function createMovie (req, res, next) {
  try {
    /// token check, user is permittable
    var token = req.header('token')
    console.log('token ', token)
    // User.findOne({_id: new ObjectId(token)}, function (err, user) {
    //   console.log('user found ',  user)
    //   if(!user) {
    //     console.log('....')
    //     return next({status: 403, message: 'no user found'})
    //   }

      var canUserCreate = req.user.accountType === 'publisher'
      if(canUserCreate) {
        var movie = new Movie(req.body)
        movie.save(function (err, createdMovie) {
          if(err)
            next({status: 403, message: 'cannot save to disk'})

          return res.status(200).json({
            result: createdMovie
          })
        })
      } else {
        next({status: 403, message: 'user is not publisher accountType'})
      }
    // })
    //console.log('token  ', token)

    //return res.status(200).json({a: 'b'})
    /// create
  } catch (e) {
    console.log(e)
    next(e)
  }
}


module.exports = {
  create: createMovie
}