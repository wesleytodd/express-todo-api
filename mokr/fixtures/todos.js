var data = require('../data/todos');
var request = require('request');

module.exports.up = function(next) {
	var run = 0;
	var errors = null;
	this.state.todoIds = [];

	data.forEach(function(todo) {
		request({
			method: 'POST',
			url: 'http://localhost:4000/api/todos',
			json: true,
			body: todo
		}, function(err, resp, body) {
			if (!err && resp.statusCode > 300) {
				err = new Error('Non 200 response: ' + resp.statusCode + ' - ' + JSON.stringify(resp.body));
			}
			if (err) {
				if (errors === null) {
					errors = [err];
				} else {
					errors.push(err);
				}
			}

			if (!err && body) {
				this.state.todoIds.push(body.id);
			}

			run++;
			if (run === data.length) {
				next(errors);
			}
		}.bind(this));
	}.bind(this));
};

module.exports.down = function(next) {
	var todos = this.state.todoIds || [];
	var run = 0;
	var errors = null;

	todos.forEach(function(id) {
		request({
			method: 'DELETE',
			url: 'http://localhost:4000/api/todos/' + id
		}, function(err, resp, body) {
			if (!err && resp.statusCode > 300) {
				err = new Error('Non 200 response');
			}
			if (err) {
				if (errors === null) {
					errors = [err];
				} else {
					errors.push(err);
				}
			}

			if (!err) {
				this.state.todoIds.splice(this.state.todoIds.indexOf(id), 1);
			}

			run++;
			if (run === data.length) {
				next(errors);
			}
		}.bind(this));
	}.bind(this));
};
