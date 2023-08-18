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
		! pass_fail && this.printFailure(compare, true);
	}

	assertEqual(compare1, compare2, description) {
		const pass_fail = this.#strictEquality(compare1, compare2);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare1, compare2);
	}

	assertNot(compare, description) {
		const pass_fail = this.#weakEquality(compare, false);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare, false);
	}

	assertNotEqual(compare1, compare2, description) {
		const pass_fail = ! this.#strictEquality(compare1, compare2);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare1, compare2);
	}

	assertInstance(compare, classRef, description) {
		const pass_fail = ! this.#strictEquality(compare instanceof classRef, true);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare, `instanceof ${classRef}`, compare instanceof classRef);
	}

	assertEmpty(compare, description) {
		const pass_fail = ! this.#strictEquality(Object.keys(compare).length, 0);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare, 'empty', Object.keys(compare).length);
	}

	assertNotEmpty(compare, description) {
		const pass_fail = ! this.#strictEquality(Object.keys(compare).length > 1, true);
		const test_icon = pass_fail ? this.pass : this.fail;
		this.#store_outcome(pass_fail);
		console.log(`${this.indent}${test_icon} ${description}`);
		! pass_fail && this.printFailure(compare, 'not empty', Object.keys(compare).length);
	}

	printFailure(compare1, compare2) {
		console.log(`\t\tExpected: \t\t\t\n==> ${compare1}`);
		console.log(`\t\t\t==> ${compare2}`);
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

module.exports = new Qa;
