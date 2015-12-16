var express = require('express');

module.exports = function(options) {

	var app = new express.Router();

	// Get a listing of todos
	app.get('/', require('./get')(options));

	// Create a new todo
	app.post('/', require('./create')(options));

	// Edit an existing todo
	app.patch('/:id', require('./edit')(options));
	app.put('/:id', require('./edit')(options));

	// Chagne todo status
	app.put('/:id/:status', require('./status')(options));

	// Delete todo completely
	app.delete('/:id', require('./delete')(options));

	return app;
};
