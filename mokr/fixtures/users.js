var data = require('../data/users');
var request = require('request');

module.exports.up = function (next) {
	var run = 0;
	var errors = null;
	this.state.userIds = [];

	data.forEach(function (user) {
		request({
			method: 'POST',
			url: 'http://localhost:4000/api/users',
			json: true,
			body: user
		}, function (err, resp, body) {
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
				this.state.userIds.push(body.id);
			}

			run++;
			if (run === data.length) {
				next(errors);
			}
		}.bind(this));
	}.bind(this));
};

module.exports.down = function (next) {
	var users = this.state.userIds || [];
	var run = 0;
	var errors = null;

	users.forEach(function (id) {
		request({
			method: 'DELETE',
			url: 'http://localhost:4000/api/users/' + id
		}, function (err, resp, body) {
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
				this.state.userIds.splice(this.state.userIds.indexOf(id), 1);
			}

			run++;
			if (run === data.length) {
				next(errors);
			}
		}.bind(this));
	}.bind(this));
};
