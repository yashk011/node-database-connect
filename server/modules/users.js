var mongoose = require('mongoose');


var Users = mongoose.model('Users' , {

  name : {
    required : true ,
    minlength : 1 ,
    type : String  ,
    trim : true
  } ,

  email : {
    required : true ,
    minlength : 1 ,
    type : String ,
    trim : true
  }
});

module.exports = {Users};
