var faker = require('faker');

module.exports = [];

// Generate 10 random users
for (var i = 0; i < 5; i++) {
	module.exports.push({
		username: faker.internet.userName(),
		displayName: faker.name.findName()
	});
}
