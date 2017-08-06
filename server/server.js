var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Task} = require('./models/task');
var {User} = require('./models/user');

var port  = process.env.PORT || 3000;
var app = express();


// Setup middleware
app.use(bodyParser.json()) ;  // send JSON to express application

// endpoints
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
		res.send({tasks});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log(`\n**express server on port ${port}`);
});

module.exports = {app};
