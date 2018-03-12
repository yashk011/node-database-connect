var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./modules/todo.js');
var {Users} = require('./modules/users.js');


var app =  express();

app.use(bodyParser.json());

app.post('/todos' , (req , res) =>{
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) =>{

    res.send(doc);

  } , (e) =>{

    res.status(400).send(e);
  });
});


/*

var newTodo = new Todo({

  text : '   ' ,
  completed: true ,
  completedAt: 123

});
newTodo.save().then((res) =>{

  console.log(res);

}, (e) =>{

console.log(' cant add to collection ' )

});


var oneUser =  new Users({
   name : '    ' ,
   email : 'ram@gmail.com'

});

oneUser.save().then((res) =>{

  console.log(res);

} , (e) =>{

  console.log('Cant add the record to database');
});
*/

app.listen(3000 , () =>{

  console.log('Listening to port 3000');
})
