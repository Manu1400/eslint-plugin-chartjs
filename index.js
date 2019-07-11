'use strict';
const path = require('path');
const importModules = require('import-modules');

module.exports = {
	rules: importModules(path.resolve(__dirname, 'lib/rules'), {camelize: false}),
	configs: {
		recommended: {
			env: {
				browser: true
			},
			rules: {
                "chartjs/font-color": "warn",
                "chartjs/min-max-configuration": "warn",
			}
		}
	}
};
