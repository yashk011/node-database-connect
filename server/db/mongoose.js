var mongoose = require('mongoose');

mongoose.Promise  = global.Promise;
mongoose.connect(process.env.MONGODB_URI );

module.exports = {mongoose};

var url =process.env.MONGODB_URI;
