//  Docs:  http://mongoosejs.com/docs/guide.html

const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Task} = require('./../server/models/task');
const {User} = require('./../server/models/user');

// remove ALL documents from collection
Task.remove({_id: '598c4dfdfad48a050fc53bc0'}).then((task) => {
	console.log(task);
});

//remove a single document by ID and return the document
Task.findByIdAndRemove('598c4dfdfad48a050fc53bc0').then((task) =>{
	console.log(task);
});
