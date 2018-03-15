
const {ObjectID} =  require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modules/todo');
const {User} = require('./../server/modules/users');

/*Todo.remove({}).then((res) =>
{
  console.log(res);
});

Todo.findByIdAndRemove('5aaa0d7cf7079e745492ee99').then((docs) =>{

  console.log(docs);

});

*/
Todo.findOneAndRemove({
  _id :'5aaa0e7df7079e745492eefd'
}).then((docs) =>{
  console.log(docs);

});
