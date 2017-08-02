// https://mongodb.github.io/node-mongodb-native/

const {
	MongoClient,
	ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskList', (err, db) => {

	if (err) {
		return console.log('unable to  connect to mongodb server')
	}

	db.collection('Tasks').findOneAndUpdate({
		_id: new ObjectId('596cd1ec00658506fd9eba21')
	}, {
		set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});

	// db.close();
});
