var express = require('express');

module.exports = function (opts) {
	var app = express.Router();

	// Get a listing of users
	app.get('/', require('./get')(opts));

	// Create a new user
	app.post('/', require('./create')(opts));

	// Delete user completely
	app.delete('/:id', require('./delete')(opts));

	return app;
};
