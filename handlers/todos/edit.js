var sendError = require('../../util/send-error');
var status = require('../../util/status');

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

		// Verify that status exists
		if (req.body.status && !status.valid(req.body.status)) {
			return sendError(res, 400, 'Invalid status: ' + req.body.status);
		}

		// Change assigned to user?
		if (req.body.assignedTo) {
			var exists = store.users.filter(function (u) {
				return u.id === req.body.assignedTo;
			}).length > 0;

			// Error if user doesnt exist
			if (!exists) {
				return sendError(res, 400, 'Assigned user does not exist');
			}

			// Add user to todo
			todo.assignedTo = req.body.assignedTo;
		}

		// Set values
		todo.text = req.body.text || todo.text;
		todo.status = req.body.status || todo.status;

		// Save data to store
		store.todos.splice(store.todos.indexOf(todo), 1, todo);

		// Respond
		res.status(200).json(todo);
	};
};
