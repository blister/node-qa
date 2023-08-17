# node-qa
node-qa is a test suite written in node to provide lightweight unit-test capabilities to a node project.

## installation
Locally to your project
```console
$ npm install --save-dev blister/node-qa
```
Globally
```console
$ npm install --global blister/node-qa
```

## quick start
```console
$ npm install --save-dev blister/node-qa
...
$ mkdir tests
$ nvim tests/test.js # edit your tests with whatever editor you want
```
Inside `tests/test.js`:
```js
const qa = require('node-qa');
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
```
```console
$ npm test

True Tests:
    ✅ True is true!
    ✅ The string "1" is true. 
    ✅ The number 1 is equal to the number 1.
3/3 Passing tests [0.002ms]

Not True TestS:
    ✅ The number 0 is false.
    ✅ The number 1 is NOT exactly the string "1".
2/2 Passing tests [0.001ms]

✅ All tests (5/5) passed! [0.003ms]
```

## qa methods
```js
    - assert(mixed compare, optional mixed compare2, string description);  
    - assertEquals(mixed compare, mixed compare2, string description);  
    - assertNot(mixed compare, string description);  
    - assertNotEquals(mixed compare, mixed compare2, string description);
    - assertInstance(object compare, class, string description);
    - assertEmpty(mixed compare, string description);
    - assertNotEmpty(mixed compare, string description);
```
