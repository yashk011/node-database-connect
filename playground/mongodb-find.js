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
  db.collection('ToDos').find({completed : false}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs , undefined , 2));

  } , (err) =>{
    console.log('Cant fetch data from table ' , err);
  });

  db.collection('ToDos').find().count().then((count) => {
    console.log('Total count = ' + count );

  } , (err) =>{
    console.log('Cant fetch data from table ' , err);
  }); */


    db.collection('Users').find({name : "Yash"}).toArray().then((res) => {
      console.log('Users') ;
      console.log(JSON.stringify(res , undefined , 2));

    } , (err) =>{
      console.log('Cant fetch data from table ' , err);
    });





//  db.close();

});
