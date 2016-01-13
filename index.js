var express = require('express');
var defined = require('defined');
var bodyParser = require('body-parser');
var todoRoutes = require('./handlers/todos');
var userRoutes = require('./handlers/users');
var store = require('./util/store');

module.exports = function (opts) {
	opts = opts || {};
	opts.prefix = defined(opts.prefix, '/api');
	opts.bodyParser = defined(opts.bodyParser, true);
	opts.store = defined(opts.store, store);

	var app = new express.Router();

	// Should we use the body parser?
	if (opts.bodyParser) {
		app.use(bodyParser.json());
	}

	// Hook in todo routes
	app.use(opts.prefix + '/todos', todoRoutes(opts));

	// Hook in user routes
	app.use(opts.prefix + '/users', userRoutes(opts));

	return app;
};
