var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env ==='test'){

  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) =>{
    process.env[key] = envConfig[key];
  });
}



/*
console.log('env *******' , env);

if(env === 'development'){
  process.env.port = 3000;
  process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoApp';
}
else if(env === 'test'){
  process.env.port = 3000;
  process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoAppTest';
  console.log('testttt');

}
*/
