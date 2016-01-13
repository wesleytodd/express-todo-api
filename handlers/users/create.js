var uuid = require('uuid');
var sendError = require('../../util/send-error');
var status = require('../../util/status');

// Create a new user
module.exports = function (options) {
	// Shorter reference to data store
	var store = options.store;

	return function (req, res) {
		if (!req.body || !req.body.username) {
			return sendError(res, 400, 'Missing or invalid user');
		}

		req.body.status = req.body.status || 'active';

		// Verify that user are enabled and exists
		if (!status.valid(req.body.status)) {
			return sendError(res, 400, 'Invalid status: ' + req.body.status);
		}

		// user object
		var user = {
			id: uuid.v4(),
			username: req.body.username,
			displayName: req.body.displayName,
			created: Date.now()
		};

		// Add to list
		store.users.push(user);

		// Respond
		res.status(201).json(user);
	};
};
