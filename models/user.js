var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
  username: String,
  password: String,
  accountType: String
});


var User = mongoose.model('user', userSchema);


module.exports = User
