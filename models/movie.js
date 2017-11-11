var mongoose = require('mongoose')


var movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'movie title is required']
  },
  rating: {
    type: Number,
    min: [1, 'cannot be less than 1'],
    max: 5
  },
  description: String // optional
});


var Movie = mongoose.model('movie', movieSchema);


module.exports = Movie
