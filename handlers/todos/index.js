var express = require('express');

module.exports = function (opts) {
	var app = new express.Router();

	// Get a listing of todos
	app.get('/', require('./get')(opts));

	// Create a new todo
	app.post('/', require('./create')(opts));

	// Edit an existing todo
	app.patch('/:id', require('./edit')(opts));
	app.put('/:id', require('./edit')(opts));

	// Chagne todo status
	app.put('/:id/status/:status', require('./status')(opts));

	// Chagne todo assigned user
	app.put('/:id/assign/:userId', require('./assign')(opts));

	// Delete todo completely
	app.delete('/:id', require('./delete')(opts));

	return app;
};
