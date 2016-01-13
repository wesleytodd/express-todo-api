var express = require('express');

module.exports = function (options) {
	var app = express.Router();

	// Get a listing of tusers
	app.get('/', require('./get')(options));

	return app;
};
