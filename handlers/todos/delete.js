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

		// Save data to store
		store.todos.splice(store.todos.indexOf(todo), 1);

		// Respond
		res.status(204).send();
	};
};
