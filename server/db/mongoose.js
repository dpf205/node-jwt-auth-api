//https://maps.google.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia

// http://www.mongoosejs,com/docs/validation.html
// http://www.mongoosejs.com/docs/guide.html

var mongoose = require('mongoose'); // @4.5.9 to avoid verbose warning triggered by later versions
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:password@ds127883.mlab.com:27883/node-tasks-api');

module.exports = {
	mongoose: mongoose
}
