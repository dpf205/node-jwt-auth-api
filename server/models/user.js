const mongoose = require('mongoose');
const validator = require('validator'); // https://www.npmjs.com/package/validator
const jwt = require('jsonwebtoken'); // jwt.io
const _ = require('lodash');
const bcrypt =  require('bcryptjs');

var UserSchema = new mongoose.Schema({
	email: {
		type: 'String',
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: { // http://mongoosejs.com/docs/validation.html
			validator: validator.isEmail,
			message: '{VALUE} is  not a valid email'
		}
	},
	password: {
		type: String,
		trim: true,
		require: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
		}]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject(); // toObject() converts mongoose variable user to an object where only the properties available on the document exist

	return _.pick(userObject, ['_id', 'email']); // ommit password and tokens array
};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';

	var token = jwt.sign({
		_id: user._id.toHexString(),
		access
	}, 'abc123').toString();

	user.tokens.push({
		access, // destructured var access = 'auth'; from above
		token
	});

	return user.save().then(() => { // success argument for the next .then() call
		return token;
	});
}; // use regular "function" keyword es6 arrow functions will not bind the "this" keyword

// Auth GET /users/me
UserSchema.statics.findByToken = function (token) {

	var User = this; // model methods get called as the model with the "this" keyword binding
	var decoded; //stores the decoded jwt values, ie the return result from jwt.verify from hashing.js

	// handle any errors from jwt.verify()
	try {
		decoded = jwt.verify(token, 'abc123');;
	} catch (e) {
		return Promise.reject();
	}

	// if successful...
	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}; // use regular "function" keyword es6 arrow functions will not bind the "this" keyword

UserSchema.pre('save', function(next) {
	var user = this;

	// check if password is modified;
		if(user.isModified('password')){
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					user.password = hash; // update the user document
					next();
				});
			});
		}else{
			next();
		}
	}); // use regular "function" keyword es6 arrow functions will not bind the "this" keyword


var User = mongoose.model('User', UserSchema);

module.exports = {
	User
}; // {User: User}
