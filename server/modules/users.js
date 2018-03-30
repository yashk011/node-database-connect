var mongoose = require('mongoose');
var validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({


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

var Users = mongoose.model('users' , UserSchema);

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
var user = this ;
var access = 'auth';
var token = jwt.sign({ _id : user._id.toHexString(), access} , 'yash56788').toString();


  user.tokens= user.tokens.concat([{access , token}]);
  return user.save().then(() =>{
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
var User = this;
var decoded;

try{
decoded = jwt.verify(token, 'yash56788')

} catch(e) {
  return new Promise.reject();


}
return User.findOne({
'_id' : decoded_id ,
'tokens.token' : token,
'tokens.access' :'auth'


});
};

UserSchema.pre('save' , function(next) {

  var user = this;
  if(user.isModified('password')){

    bcrypt.genSalt(10,(err,salt) =>{

      bcrypt.hash(user.password, salt ,(err,hash) =>{
        user.password = hash;
        next();
      });
    });

  }
  else {
    next();
  }
});
module.exports = {Users};
