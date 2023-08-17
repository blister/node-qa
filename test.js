const qa = require('./index');
qa.test('True Tests', function() {
	this.assert(true, 'True is true!');
	
	// assert uses "truthy" checks in JS
	this.assert('1', 'The string "1" true.');

	// assertEqual uses strict equality checking
	this.assertEqual(1, 1, 'The number 1 is equal to the number 1.');

});
qa.test('Not True Tests', function() {
	this.assertNot(0, 'The number 0 is false.');

	// for strict comparisons
	this.assertNotEqual(1, '1', 'The number 1 is NOT exactly the string "1".');
});
qa.finish();
