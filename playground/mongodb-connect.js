//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err,db) => {

  if(err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');
/*
  db.collection('ToDos').insertOne({
    text :'Bring Bread',
    completed : false

  } , (error , res) => {

    if(error){
      return console.log('Somethings not right cant connect' , error);
    }

    console.log(JSON.stringify(res.ops ,undefined , 2));

  });*/

  db.collection('Users').insertOne({
    name: 'Yash' ,
    age: 20 ,
    location: 'Raipur'

  },(error , res) =>{

    if(error){
      return console.log('Cant connect to collection User');
    }

    console.log(JSON.stringify(res.ops , undefined , 2));
  });

  db.close();

});
