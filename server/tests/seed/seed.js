
const {ObjectID} = require('mongodb');
const jwt =  require('jsonwebtoken');

const {Task} = require('./../../models/task');
const {User}  = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
		_id: userOneId,
		email: 'first.user@example.com',
		password: 'userOnePass',
		tokens: [{
				access: 'auth',
				token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
		}]
	},{
		_id: userTwoId,
		email: 'second.user@example.com',
		password:'userTwoPass'
	}]

const tasks = [
	{
	_id: new ObjectID(),
	text: '1st test task'
},
   {
	_id: new ObjectID(),
	text: '2nd test task',
	completed: true,
	completedAt: 333
   }
];

const populateTasks = (done) => {
	Task.remove({}).then(() => {
		return Task.insertMany(tasks);
	}).then(() => done()); // use a callback to call done() via expression based syntax
}

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		// wait for above promises to resolve w/ Promise.all([])
		return Promise.all([userOne,userTwo])
	}).then(() => done());
};


module.exports = {tasks, populateTasks, users, populateUsers}; // {tasks: tasks, populateTasks: populateTasks, users: users, populateUsers: populateUsers }
