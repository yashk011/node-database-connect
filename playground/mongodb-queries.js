// ERROR WHEN DONE WITH USER.........cant recognise find function


const {ObjectID} =  require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modules/todo');
const {User} = require('./../server/modules/users');

/*
var id ="5aa6c79f87ee2c33970f2c47";

if(!ObjectID.isValid(id)) {
  console.log('Invalid object id');
}


Todo.find({
  _id :id
}).then((todos) =>{

  console.log('Todos' , todos);
});

Todo.findOne({
  _id :id

}).then((todo) =>{
  console.log('Todo ' , todo);
});


Todo.findById(id).then((todo) =>{

  if(!todo) {
    return console.log('Id not found...');
  }

  console.log('TodoId ' , todo);
}).catch((e) => console.log(e));
*/


id : '5aa76b8087ee2c33970f857d' ;


User.findOne({
  _id : id}).then((user) =>{
  console.log(JSON.stringify(user , undefined , 2));
});
/*
User.findById(id).then((user) =>{
  if(!user) {

    return  console.log('Cant find any user ');
  }
  console.log(JSON.stringify(user , undefined , 2));


}).catch(e) =>{

  console.log(e);
};
*/
