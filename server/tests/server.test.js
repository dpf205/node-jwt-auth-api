const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Task} = require('./../models/task');


// run beforeEach before EVERY test to  empty db before every supertest request
beforeEach((done)=>{
	Task.remove({}).then(()=>{
		done();
	})

	// Or using the expression syntax
	// Task.remove({}).then(() => done())
});

//  run test suite via npm run test-watch (refer to package.json)

describe('POST /tasks', () => {
	it('should create a new task in db', (done) => {
		var text = 'Test the text property for a task';

	request(app)
		.post('/tasks')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res)=>{
			if(err){
				return done(err);
			}

			Task.find().then((tasks)=>{
				expect(tasks.length).toBe(1)
				expect(tasks[0].text).toBe(text);
				done();
			}).catch((e) => done(e)); // arrow function passes error to  done() using the statement syntaxt NOT the arrow function expression syntax
		});
	});

	it('should not create task with invalid  body data', (done) => {
		let text = '';

			request(app)
			.post('/tasks')
			.send({text})
			.expect(400)
			.end((err, res) => {
				if(err){
					return done(err);
				}
			Task.find().then((tasks) => {
				expect(tasks.length).toBe(0);
				done();
			}).catch((e) => done(e));
		});
	});
});
