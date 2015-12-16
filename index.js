var express = require('express');
var bodyParser = require('body-parser');
var todoRoutes = require('./handlers/todos');
var userRoutes = require('./handlers/users');
var store = require('./util/store');

var main = module.exports = function(opts) {
	opts = opts || {};
	opts.prefix = opts.prefix || '/api';
	opts.users = opts.users || false;
	opts.store = opts.store || store;

	var app = new express.Router();
	app.use(bodyParser.json());
	app.use(opts.prefix + '/todos', todoRoutes(opts));

	if (opts.users) {
		app.use(opts.prefix + '/users', userRoutes(opts));
	}

	return app;
};
