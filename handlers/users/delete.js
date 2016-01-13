var sendError = require('../../util/send-error');

// Delete a user
module.exports = function (options) {
	// Shorter reference to data store
	var store = options.store;

	return function (req, res) {
		var user = store.users.filter(function (u) {
			return u.id === req.params.id;
		})[0];

		// No user with that id
		if (!user) {
			return sendError(res, 404, 'User not found');
		}

		// Save data to store
		store.users.splice(store.users.indexOf(user), 1);

		// Respond
		res.status(204).send();
	};
};
