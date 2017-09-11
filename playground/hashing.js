const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); // jwt.io
const bcrypt =  require('bcryptjs');

var password =  '123abc!';
bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log('\n Hashed value, like a password: ' , hash);
	})
});

var hashedPAssword = '$2a$10$z8qszZh9aS98I1sxfnHyK.0ULi69qkuc0.TKopSeb8it9vYelkcSq';

bcrypt.compare('1231', hashedPAssword, (err,res) => {
	console.log('if response is true then password = hashed value. the response is', res);
});

// var data = {
// 	id: 10
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token + 'a', '123abc');
// console.log('decoded' ,decoded);
