const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser')
const {
	ObjectID
} = require('mongodb');

var {
	mongoose
} = require('./db/mongoose');
var {
	Task
} = require('./models/task');
var {
	User
} = require('./models/user');

var port = process.env.PORT || 3000;
var app = express();


// Setup middleware
app.use(bodyParser.json()); // send JSON to express application

// Endpoints
app.get('/', (req, res) => {
	res.send('This is the test home page');
})


app.post('/tasks', (req, res) => {
	//console.log(req.body);
	var task = new Task({
		text: req.body.text
	});

	task.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/tasks', (req, res) => {

	Task.find().then((tasks) => {
		res.send({
			tasks
		}); //  tasks: tasks
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/tasks/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Task.findById(id).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({
			task
		}); // task: task
		// console.log(task.text);
	}).catch((e) => {
		res.status(404).send();
	});
});

app.delete('/tasks/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Task.findByIdAndRemove(id).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({
			task
		}); // {task: task}
	}).catch((e) => {
		res.status(404).send();
	});
});

app.patch('/tasks/:id', (req, res) => {
	var id = req.params.id;

	// limit which proerties are updated by user
	var body = _.pick(req.body, ['text', 'completed']) // _.pick() takes object and extracts an array of desired properties

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Task.findByIdAndUpdate(id, {
		$set: body
	}, {
		new: true
	}).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({
			task
		});
	}).catch((e) => {
		res.status(400).send();
	})
});

// POST /users
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']); // _.pick() takes object and pushes it to an array of desired properties
	var user = new User(body);

	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});

// app.get('/users/me', )

app.listen(port, () => {
	console.log(`\n** express server on port ${port}`);
});

module.exports = {
	app
}; // app: app
