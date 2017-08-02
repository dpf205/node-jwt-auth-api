var mongoose = require('mongoose'); // @4.5.9 to avoid verbose warning triggered by later versions
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds127883.mlab.com:27883/node-tasks-api');

// create model schema
var Task = mongoose.model('Task', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

var anotherTask = new Task({
	text: 'billions',
	completed: true,
	completedAt: 0900
});

anotherTask.save().then((docs) => {
	console.log('task saved successfully', docs);
}, (e) => {
	console.log('unable to save task', e);
});
