
// http://www.mongoosejs,com/docs/validation.html
// http://www.mongoosejs.com/docs/guide.html

require('dotenv').config(); // https://github.com/motdotla/dotenv

var mongoose = require('mongoose'); // @4.5.9 to avoid current verbose warning triggered by later versions

mongoose.Promise = global.Promise;

// connect to Heroku addon mLab db "MONGOLAB_BLUE_URI" or directly via mlab account MLAB_URI
mongoose.connect(process.env.MONGOLAB_BLUE_URI || process.env.MLAB_URI, () => {
	if(process.env.MLAB_URI){
		console.log('** connected to private mLab DB instance');
	}
	else if (process.env.MONGOLAB_BLUE_URI) {
		console.log('** connected to Heroku mLab addon instance');
	}
});


module.exports = {mongoose} // 	mongoose: mongoose
