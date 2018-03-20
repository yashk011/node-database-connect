var mongoose = require('mongoose');
var validator = require('validator');

var Users = mongoose.model('Users' , {



  email : {
    required : true ,
    minlength : 1 ,
    type : String ,
    trim : true,
    unique : true ,
    validate :{
      validator : validator.isEmail,
      message : '{VALUE} is not email'
    }
  } ,

  password : {

    type:String,
    required:true,
    minlength:6
  } ,

  tokens : [{
    access : {
      type :String ,
      required : true

    } ,
    token : {
      type : String ,
      required :true
    }
  }]
});

module.exports = {Users};
