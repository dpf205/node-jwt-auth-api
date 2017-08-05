
// http://www.mongoosejs,com/docs/validation.html
// http://www.mongoosejs.com/docs/guide.html

var mongoose = require('mongoose'); // @4.5.9 to avoid verbose warning triggered by later versions


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds127883.mlab.com:27883/node-tasks-api');

module.exports = {mongoose} // 	mongoose: mongoose
