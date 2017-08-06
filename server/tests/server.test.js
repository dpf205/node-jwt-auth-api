//  run test suite via npm run test-watch (refer to package.json)

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Task} = require('./../models/task');

// populate db
const tasks = [{
	text: '1st test task'
}, {
	text: '2nd test task'
}];

//run beforeEach before EVERY test to empty db and seed it before every supertest request
beforeEach((done) => {
	Task.remove({}).then(() => {
		return Task.insertMany(tasks);
	}).then(() => done()); // use a callback to call done() via expression based syntax
});

describe('POST /tasks', () => {
	it('should create a new task', (done) => {
	   var text = 'Test text property of a task';

	  request(app)
		.post('/tasks')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err){
				return done(err);
			}

		Task.find({text}).then((tasks) => {
			expect(tasks.length).toBe(1);
			expect(tasks[0].text).toBe(text); // new task created and prepended
			done();
			}).catch((e) => done(e)); // arrow function passes error to  done() using the statement syntaxt NOT the arrow function expression syntax
		});
	});

	it('should not create task with invalid body data', (done) => {
			request(app)
			.post('/tasks')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err){
					return done(err);
				}

			Task.find().then((tasks) => {
				expect(tasks.length).toBe(2); //there should only be 2 docs in task collection, as added above in task array
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /tasks', () => {
	it('should get all tasks in db', (done) => {
		request(app)
		.get('/tasks')
		.expect(200)
		.expect((res) => {
			expect(res.body.tasks.length).toBe(2);
		})
		.end(done);
	});
});
