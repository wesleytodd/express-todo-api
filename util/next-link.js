var url = require('url');

module.exports = function (u, total, limit, offset, qry) {
	qry = qry || {};
	qry.limit = limit;
	qry.offset = offset + limit;

	if (qry.offset < total) {
		return url.format({
			pathname: u,
			query: qry
		});
	}
};
