class Qa {
	indent = '\t';

	test(description, callback) {
		console.log(`${description}:`);
		if ( typeof(callback) === 'function' ) {
			callback.call(this);
		}
	}

	check(description) {
		console.log(`${this.indent}✅ ${description}`);
	}

	assert(compare, description) {
		let pass_fail = '✅';
		
		console.log(`${this.indent}${pass_fail} ${description}`);
	}
}

class Assertion {
	passing = null;
	description = null;
	callback = null;
	error = null;

	constructor(description, callback) {
		this.description = description;
		this.callback    = callback;
	}
}

module.exports = new Qa;
