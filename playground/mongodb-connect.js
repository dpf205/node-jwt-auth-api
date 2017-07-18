// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TaskList', (err, db) => {
    if (err) {
        return console.log('unable to connect to  mongodb server');
    }
    console.log('connected to mongodb server');

    // db.collection('Tasks').insertOne({
    // 	text: "something to do",
    // 	completed: false
    // }, (err, result) => {
    // 	if (err) {
    // 		return console.log('unable to insert task', err)
    // 	}
    // 	console.log(JSON.stringify(result.ops, undefined, 2)); //ops attribute stores all the docs that are inserted
    // });

    // db.collection('Users').insertOne({
    // 	name: 'Peter',
    // 	age: 35,
    // 	location: 'Pittsburgh'
    // }, (err, result) => {
    // 	if (err) {
    // 		return console.log('unable to insert user data', err);
    // 	}
    // 	console.log(JSON.stringify(result.ops, undefined, 2)); // ops attribute stores all the docs that are inserted
    // 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp())); // use defualt ObjectId to get the timestamp
    // });Elizabeth Holmes

    db.close();
});
