
// http://www.mongoosejs,com/docs/validation.html
// http://www.mongoosejs.com/docs/guide.html

require('dotenv').config(); // https://github.com/motdotla/dotenv

var mongoose = require('mongoose'); // @4.5.9 to avoid current verbose warning triggered by later versions

const mLab_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds127883.mlab.com:27883/node-tasks-api`;

mongoose.Promise = global.Promise;
mongoose.connect(mLab_URI, () =>{
	console.log('**connected to mLab URI\n');
});

module.exports = {mongoose} // 	mongoose: mongoose
