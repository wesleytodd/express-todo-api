var url = require('url');

module.exports = function (u, total, limit, offset, qry) {
	qry = qry || {};
	qry.limit = limit;
	qry.offset = offset + limit;

	if (qry.offset < total) {
		// Removed undefined values
		for (var i in qry) {
			if (typeof qry[i] === 'undefined' || qry[i] === null) {
				delete qry[i];
			}
		}

		return url.format({
			pathname: u,
			query: qry
		});
	}
};
