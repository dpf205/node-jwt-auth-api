const {
	MongoClient,
	ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskList', (err, db) => {

	db.collection('Tasks').deleteMany({
		text: "finish api design specification"
	}).then((result) => {
		console.log(result)
	});

	db.collection('Tasks').deleteOne({
		text: "walk the dog"
	}).then((result) => {
		console.log(result);
	});

	db.collection('Tasks').findOneAndDelete({
		completed: false
	}).then((result) => {
		console.log(result);
	});

	db.collection('Users').deleteMany({
		name: 'John'
	}).then((result) => {
		console.log(result);
	});

	db.collection('Users').deleteOne({
		_id: new ObjectId("596a2fd8a161d30daa4d19df")
	}, (result) => {
		console.log(result);
	});
	// db.close();
});
