const jwt = require('jsonwebtoken');

var data ={
  id :10
}

var token = jwt.sign(data , 'yash');
console.log('encoded' , token);

var decoded = jwt.verify(token , 'yash');
console.log('decoded', decoded);
