const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect('mongodb://nightspring:nightspring@ds129031.mlab.com:29031/pusherpoll')
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));