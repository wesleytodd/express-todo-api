var faker = require('faker');

module.exports = [];

// Generate 10 random todos
for (var i = 0; i < 10; i++) {
	module.exports.push({
		text: faker.hacker.verb() + ' the ' + faker.hacker.adjective() + ' ' + faker.hacker.noun(),
		status: faker.random.boolean() ? 'active' : 'complete'
	});
}
