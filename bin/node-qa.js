#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const dir = path.join(process.cwd(), 'tests');

fs.readdirSync(dir).forEach(file => {
	if ( file.endsWith('.js') ) {
		const testFilePath = path.join(dir, file);

		try {
			execSync(`node ${testFilePath}`, { stdio: 'inherit' });
		} catch(e) {
			console.error(`Error: ${e}`);
			console.error(error.stderr.toString());
		}
	}
});


