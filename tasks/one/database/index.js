const mongoose = require('mongoose'),
	{ MONGO_URL } = require('../config.json');

module.exports = {
	init: () => {
		const dbOptions = {
			useNewUrlParser   : true,
			autoIndex         : false,
			connectTimeoutMS  : 10000,
			family            : 4,
			useUnifiedTopology: true,
		};
		mongoose.connect(MONGO_URL, dbOptions);
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', () => {
			console.log('MongoDB successfully connected');
		});
		mongoose.connection.on('err', (err) => {
			console.log(`MongoDB has encountered an error: \n ${err.stack}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('MongoDB disconnected');
		});
	},
};