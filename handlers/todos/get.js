var nextLink = require('../../util/next-link');
var prevLink = require('../../util/prev-link');

module.exports = function (options) {
	// Shorter reference to data store
	var store = options.store;

	return function (req, res) {
		// Accpted query params
		var limit = parseInt(req.query.limit || 5, 10);
		var offset = parseInt(req.query.offset || 0, 10);
		var status = (req.query.status || 'all').toLowerCase();
		var responseData = {
			_links: {},
			todos: store.todos.slice(),
			total: store.todos.length
		};

		// Filter by status
		if (status !== 'all') {
			responseData.todos = store.todos.filter(function (todo) {
				return todo.status === status;
			});
		}

		// Only show as many users as the limit
		responseData.todos = responseData.todos.slice(offset, offset + limit);

		// Next link
		var next = nextLink(options.prefix + '/todos', store.todos.length, limit, offset, {
			status: status
		});
		if (next) {
			responseData._links.next = next;
		}

		// Previous link
		var prev = prevLink(options.prefix + '/todos', store.users.length, limit, offset, {
			status: status
		});
		if (prev) {
			responseData._links.prev = prev;
		}

		res.status(200).json(responseData);
	};
};
