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
  db.collection('ToDos').deleteMany({text :'Bring Bread'}).then((res) => {

    console.log(res);
  });
  */

/*  db.collection('ToDos').deleteOne({completed : true}).then((res) => {
    console.log(res);
  });

  db.collection('ToDos').findOneAndDelete({text :'Bring Bread'}).then((res) =>{

    console.log(res);
  });

  db.collection('Users').findOneAndDelete({_id : new ObjectID("5aa558ac87ee2c33970e6a76")}).then((res) => {

    console.log(res);
  });*/

  db.collection('Users').deleteMany({name :'Yash'}).then((res) => {

    console.log(res);
  });

//  db.close();

});
