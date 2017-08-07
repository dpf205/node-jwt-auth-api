//  Docs:  http://mongoosejs.com/docs/guide.html

const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Task} = require('./../server/models/task');
const {User} = require('./../server/models/user');

// valid task Id
var id  = '598741fa917e3cdb38071243';

// invalid task Id
var invalidId = 'INVALIDa917e3cdb38071243';

if(!ObjectId.isValid(id)){
	console.log('ID not valid')
}

Task.find({
	_id: id
}).then((tasks) => {
	console.log('Tasks:', tasks, '\n');
});

Task.findOne({
	_id: id
}).then((task) => {
	console.log('Task:', task, '\n');
});

Task.findById(id).then((task) => {
	if(!task){
		return console.log('Id not found');
	}
	console.log('Task by Id:', task, '\n');
}).catch((e) => console.log(e));

// valid userID
var userId = '598200cffaa61b77b408e59e';

User.findById(userId).then((user) => {
	if(!user){
		return console.log('unable to find user');
	}

	console.log('User by Id:', JSON.stringify(user, undefined, 2), '\n');
}, (e) => {
	console.log(e);
});
