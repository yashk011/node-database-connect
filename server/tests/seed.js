const {Todo} = require('./../modules/todo');
const {ObjectID} = require('mongodb');
const {Users} = require('./../modules/users');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
_id : userOneId,
email:'moni@gmail.com',
password:'NewOne1',
tokens : [{
  access : 'auth',
  token : jwt.sign({_id : userOneId , access:'auth'}, process.env.JWT_SECRET).toString()

  }]
},
{
_id :userTwoId,
email:'mai@gmail.com',
password :'NewTwo2'


}];


const todos = [{
  _id: new ObjectID(),
  text: 'First test todo' ,
  completed: false,
  _creator : users[0]._id
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed:true,
  completedAt:123,
  _creator : users[1]._id
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) =>{

  Users.remove({}).then(() =>{
    var userOne = new Users(users[0]).save();
    var userTwo = new Users(users[1]).save();

    return Promise.all([userOne , userTwo])
  }).then(() =>done());


};

module.exports = {populateTodos , todos ,users,populateUsers};
