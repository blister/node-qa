class Qa {
	indent = '\t';
	pass   = '✅';
	fail   = '❌';
	test_outcomes = {
		total: 0,
		pass: 0,
		fail: 0,
	};
	outcomes = {
		total: 0,
		pass: 0,
		fail: 0,
	};

	finish() {
		console.log('');
		if ( this.outcomes.fail ) {
			console.log(`${this.fail} Failed ${this.outcomes.fail} tests [tm ms]`);
		} else {
			console.log(`${this.pass} All tests (${this.outcomes.pass}/${this.outcomes.total}) passed! [tm ms]`);
		}
	}

	test(description, callback) {
		this.test_outcomes = { pass: 0, fail: 0, total: 0 };
		console.log(`\n${description}:`);
		if ( typeof(callback) === 'function' ) {
			callback.call(this);
		}

		if ( this.test_outcomes.fail ) {
			console.log(`${this.test_outcomes.pass}/${this.test_outcomes.total} Passing Tests [tm ms]`);
		} else {
			console.log(`${this.test_outcomes.pass}/${this.test_outcomes.total} Passing Tests [tm ms]`);
		}
	}

	check(description) {
		console.log(`${this.indent}✅ ${description}`);
	}

	assert(compare, description) {
		const pass_fail = this.#weakEquality(compare, true);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertEqual(compare1, compare2, description) {
		const pass_fail = this.#strictEquality(compare1, compare2);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertNot(compare, description) {
		const pass_fail = this.#weakEquality(compare, false);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertNotEqual(compare1, compare2, description) {
		const pass_fail = ! this.#strictEquality(compare1, compare2);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertInstance(compare, classRef, description) {
		const pass_fail = ! this.#strictEquality(compare instanceof classRef, true);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertEmpty(compare, description) {
		const pass_fail = ! this.#strictEquality(Object.keys(compare).length, 0);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	assertNotEmpty(compare, description) {
		const pass_fail = ! this.#strictEquality(Object.keys(compare).length > 1, true);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
	}

	// private methods
	#weakEquality(compare1, compare2) {
		return compare1 == compare2;
	}

	#strictEquality(compare1, compare2) {
		return compare1 === compare2;
	}

	#store_outcome(pass_fail) {
		this.test_outcomes.total++;
		this.test_outcomes['pass'] += pass_fail ? 1 : 0;	
		this.test_outcomes['fail'] += pass_fail ? 0 : 1;	
		this.outcomes.total++;
		this.outcomes['pass'] += pass_fail ? 1 : 0;	
		this.outcomes['fail'] += pass_fail ? 0 : 1;	
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
