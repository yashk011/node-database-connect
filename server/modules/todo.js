var mongoose = require('mongoose');

var Todo = mongoose.model('todos' , {

  text : {

    type : String ,
    required : [true , 'whhy nothing to do ?'] ,
    minlength : 1 ,
    trim : true
  } ,

  completed:{
    type: Boolean ,
    default: false
  },
  completedAt :{

    type : Number ,
    default: null

  }

});

module.exports = {Todo};
