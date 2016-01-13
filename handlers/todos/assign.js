var sendError = require('../../util/send-error');

// Create a new todo
module.exports = function (options) {
	// Shorter reference to data store
	var store = options.store;

	return function (req, res) {
		var todo = store.todos.filter(function (t) {
			return t.id === req.params.id;
		})[0];

		// No todo with that id
		if (!todo) {
			return sendError(res, 404, 'Todo not found');
		}

		// Verify that user exists
		var user = store.users.filter(function (u) {
			return u.id === req.params.userId;
		})[0];
		if (!user) {
			return sendError(res, 400, 'User not found: ' + req.params.userId);
		}

		// Set values
		todo.assignedTo = user.id;

		// Save data to store
		store.users.splice(store.users.indexOf(user), 1, user);

		// Respond
		res.status(200).json(todo);
	};
};
