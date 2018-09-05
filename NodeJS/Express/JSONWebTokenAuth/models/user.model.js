let mongoose = require('mongoose');

let User = mongoose.model('User', { username: String, bio: String, password: String });

module.exports = User;
