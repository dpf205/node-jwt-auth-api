// dpfs-MacBook-Pro@dpf205:~/mongo/bin $ ./mongod --dbpath ~/mongo-data

// https://mongodb.github.io/node-mongodb-native/

const {
	MongoClient,
	ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskList', (err, db) => {
	if (err) {
		return console.log('unable to connect to  mongodb server');
	}
	console.log('connected to mongodb server');

	db.collection('Tasks').find({
		_id: new ObjectId('596a2e1e78597b0d9dc5e6c5')
	}).toArray().then((docs) => {
		console.log("Tasks");
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('unable to fetch tasks', err)
	})


	db.collection('Tasks').find().count().then((count) => {
		console.log(`Tasks count: ${count}`);
	}, (err) => {
		console.log('unable to fetch tasks', err)
	});

	db.collection('Users').find({
		name: 'Peter'
	}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('unable to retrieve user information');
	});

	db.close();
});
