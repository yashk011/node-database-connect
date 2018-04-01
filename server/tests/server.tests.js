
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../modules/todo');
const {User} = require('./../modules/users');

const {todos,populateTodos,users,populateUsers} = require('./seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});


describe('DELETE /todos/:id' , () =>{

  it('should return 200 status with deleted todos' ,(done) =>{
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) =>{
        expect (res.body.todo._id).toBe(hexId);
      })
      .end((err , res) =>{

        if(err){
          return done(err);
        }

        Todo.findById(hexId).then((res) =>{
          expect(res).toNotExist();
          done();
        }).catch((e)=> done(e));
      });

  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });

});


describe('PATCH /todos' ,() =>{
  it('should return updated value of completed to true' , (done) =>{
    var hexId = todos[0]._id.toHexString();
    var text = 'New Text'

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed : true ,
      text

    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
      expect(res.body.todo.text).toBe(text);

    })
    .end(done);
  });

  it('should return updated value of completed to False' , (done) =>{
    var hexId = todos[1]._id.toHexString();
    var text = 'new Text 2'

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed : false ,
      completedAt :null

    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
      expect(res.body.todo.text).toBe(text);

    })
    .end(done);
  });
});

describe('GET /users' , () =>{

  it('should return user if authenticated' ,(done) =>{
    request(app)
      .get('/users/me')
      .set('x-auth' , users[0].tokens[0].token)
      .expect(200)
      .expect((res) =>{

        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not autheticated' , (done) =>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) =>{

        expect(res.body).toEqual({});

      })
      .end(done);

  });



});


describe('POST /users' ,() =>{

  it('should craete a user' , (done) =>{

    request(app)
      	.post('/users')
        .send({email:'khurana@gmail.com' , password:'khurana@123'})
        .expect(200)
        .expect((res) =>{

          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);

        })
        .end((err) =>{

          if(err) {
            return done(err);
          }
          User.findOne({email}).then((user) =>{
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();

          }).catch((e) =>{
            done(e);
          });

        });

  });

  it('should return validation errors' ,(done) =>{


    request(app)
    .post('/users')
    .send({email :'ygjgab' , password:'sah'})
    .expect(400)

    .end(done);




  });

  it('should not create a user' , (done) =>{

    request(app)

    .post('/post')
    .send({
      email: users[0].email,
      password:'NewOne1'
    })
    .expect(400)
    .end(done);



  });


});


describe('POST /users/login' , () =>{
  it('should login user and return a token' ,(done) =>{

    request(app)
    .get('/users/login')
    .send({email : users[1].email, password : users[1].password })
    .expect(200)
    .expect((res) =>{
      expect(res.headers['x-auth']).toExist();
    })
    .end((err ,res) =>{
      if(err) {
        return done(err);
      }

      User.findById(users[1]._id).then((user) =>{

        expect(user.tokens[0]).toInclude({
          access :'auth' ,
          token : res.header['x-auth']
        });
        done();
      }).catch((e) =>{
        done(e);
      });
    });

  });

  it('should not login user and return 400 error' , (done) =>{

    request(app)
    .post('/users/login')
    .expect(400)
    .send({email :users[0].email,
    password : 'ashbh'})
    .expect((res) =>{
      expect(res.headers['x-auth']).toNotExist();

    })
    .end((err , res) =>{
      if(err){

      }

      User.findById(users[1]._id).then((user) =>{

        expect(user.tokens.length).toBe(0);
        done();
      }).catch((e) =>{
        done(e);
      });

    });


  });


});
