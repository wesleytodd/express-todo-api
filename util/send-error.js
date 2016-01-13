module.exports = function (res, status, msg) {
	res.status(status).send({
		error: {
			message: msg
		}
	});
};
