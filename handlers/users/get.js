var nextLink = require('../../util/next-link');
var prevLink = require('../../util/prev-link');

module.exports = function(options) {
	// Shorter reference to data store
	var store = options.store;

	return function(req, res) {
		// Accpted query params
		var limit = parseInt(req.query.limit || 5);
		var offset = parseInt(req.query.offset || 0);
		var query = (req.query.query || '').toLowerCase();
		var responseData = {
			_links: {},
			users: store.users,
			total: store.users.length
		};

		// Filter by query
		if (query) {
			responseData.users = store.users.filter(function(user) {
				return !!(user.slug.toLowerCase().indexOf(query) !== -1);
			}).sort(function(a, b) {
				return a.slug.toLowerCase().indexOf(query) - b.slug.toLowerCase().indexOf(query);
			});
		}

		// Only show as many users as the limit
		responseData.users = responseData.users.slice(offset, offset + limit);

		// Next link
		var next = nextLink(opts.prefix + '/users', store.users.length, limit, offset, {
			query: query
		});
		if (next) {
			responseData._links.next = next;
		}

		// Previous link
		var prev = prevLink(opts.prefix + '/users', store.users.length, limit, offset, {
			query: query
		});
		if (prev) {
			responseData._links.prev = prev;
		}

		res.status(200).json(responseData);
	};
};
