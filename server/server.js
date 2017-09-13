const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser')

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Task} = require('./models/task');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var port = process.env.PORT || 3000;
var app = express();


// Setup middleware
app.use(bodyParser.json()); // send JSON to express application


// GET /
app.get('/', (req, res) => {
	res.send('This is the test home page');
})

// POST /tasks
app.post('/tasks', authenticate, (req, res) => {
	//console.log(req.body);
	var task = new Task({
		text: req.body.text,
		_creator: req.user._id
	});

	task.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /tasks
app.get('/tasks', authenticate, (req, res) => {

	Task.find({_creator: req.user._id}).then((tasks) => {
		res.send({tasks}); //  tasks: tasks
	}, (e) => {
		res.status(400).send(e);
	});
});

// GET /tasks/:id
app.get('/tasks/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Task.findOne({
		_id: id,
		_creator: req.user._id
	}).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({task}); // task: task
		// console.log(task.text);
	}).catch((e) => {
		res.status(404).send();
	});
});

// DELETE /tasks/:id
app.delete('/tasks/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Task.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({task}); // {task: task}
	}).catch((e) => {
		res.status(404).send();
	});
});

// PATCH /tasks/:id
app.patch('/tasks/:id', authenticate, (req, res) => {
	var id = req.params.id;

	// limit which proerties are updated by user
	var body = _.pick(req.body, ['text', 'completed']) // _.pick() takes object and extracts an array of desired properties

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Task.findOneAndUpdate({
		_id: id, 
		_creator: req.user._id
	}, {
		$set: body
	}, {
		new: true
	}).then((task) => {
		if (!task) {
			return res.status(404).send();
		}
		res.send({task});
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
		res.header('x-auth', token).send(user); // generate auth token
	}).catch((e) => {
		res.status(400).send(e);
	})
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// POST /users/login
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req,res) => {
	 req.user.removeToken(req.token).then(() => {
		 res.status(200).send();
	 }, () => {
		 res.status(400).send();
	 });
});

app.listen(port, () => {
	console.log(`\n** express server on port ${port}`);
});

module.exports = {app}; // app: app
