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
			todos: [],
			total: 0
		};

		// Filter on status and assigned to
		responseData.todos = store.todos.filter(function (todo) {
			// Filter by status
			if (status !== 'all' && todo.status !== status) {
				return false;
			}

			// Filter by assgnee
			if (req.query.assignedTo && todo.assignedTo !== req.query.assignedTo) {
				return false;
			}

			return true;
		});
		
		// Add total
		responseData.total = responseData.todos.length;

		// Only show as many todos as the limit
		responseData.todos = responseData.todos.slice(offset, offset + limit);

		// With user?
		if (req.query.withUser) {
			responseData.todos = responseData.todos.map(function (todo) {

				if (!todo.assignedTo) {
					return todo;
				}

				var user = store.users.filter(function (u) {
					return u.id === todo.assignedTo;
				})[0];

				// No user
				if (!user) {
					delete todo.assignedTo;
					return todo;
				}

				// Clone items so we dont modify the store
				var o = {};
				for (var i in todo) {
					o[i] = todo[i];
				}

				// Assign user
				o.assignedTo = user;
				return o;
			});
		}

		// Next link
		var next = nextLink(options.prefix + '/todos', responseData.total, limit, offset, {
			status: status,
			assignedTo: req.query.assignedTo
		});
		if (next) {
			responseData._links.next = next;
		}

		// Previous link
		var prev = prevLink(options.prefix + '/todos', responseData.total, limit, offset, {
			status: status,
			assignedTo: req.query.assignedTo
		});
		if (prev) {
			responseData._links.prev = prev;
		}

		res.status(200).json(responseData);
	};
};
