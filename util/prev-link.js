var url = require('url');

module.exports = function (u, total, limit, offset, qry) {
	qry = qry || {};
	qry.limit = limit;
	qry.offset = offset + limit;

	if (offset !== 0) {
		qry.offset = offset - limit > 0 ? offset - limit : 0;
		qry.limit = offset - qry.offset;

		return url.format({
			pathname: u,
			query: qry
		});
	}
};
