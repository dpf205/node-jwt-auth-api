var express = require('express');
var bodyParser = require('body-parser')

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Task} = require('./models/task');
var {User} = require('./models/user');

var port  = process.env.PORT || 3000;
var app = express();


// Setup middleware
app.use(bodyParser.json()) ;  // send JSON to express application

// Endpoints
app.get('/', (req,res) => {
	res.send('This is the test home page');
})

//
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
		res.send({tasks}); //  tasks: tasks
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/tasks/:id', (req,res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Task.findById(id).then((task)=>{
		if(!task){
			return res.status(404).send();
		}
		res.send({task}); // task: task
		// console.log(task.text);
	}).catch((e) =>{
		res.status(404).send();
	});
});

app.delete('/tasks/:id', (req,res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Task.findByIdAndRemove(id).then((task) => {
		if(!task){
			return res.status(404).send();
		}
		res.send({task}); // {task: task}
	}).catch((e) => {
		res.status(404).send();
	});
});

app.listen(port, () => {
	console.log(`\n** express server on port ${port}`);
});

module.exports = {app}; // app: app
