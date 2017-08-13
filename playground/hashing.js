const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); // jwt.io

var data = {
	id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token + 'a', '123abc');
console.log('decoded' ,decoded);
