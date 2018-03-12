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
  db.collection('ToDos').findOneAndUpdate({
    _id : new ObjectID("5aa5792c87ee2c33970e75da")
  } , {

    $set :{
    completed:false
    }
  },{
    returnOriginal : false
  }).then((res) =>{

    console.log(res);
  });

*/
  db.collection('Users').findOneAndUpdate({
    _id : new ObjectID("5aa55b940c10ba1d98673664")
  } , {

    $set :{
    name : 'Yash'
  } ,

    $inc :{
      age :33
    }
  },{
    returnOriginal : false
  }).then((res) =>{

    console.log(res);
  });

//  db.close();



});
