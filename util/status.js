module.exports = {
	ACTIVE: 'active',
	COMPLETE: 'complete',
	valid: function(status) {
		return !!this[(status || '').toUpperCase()];
	}
};
