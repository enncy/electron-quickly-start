const { series } = require('gulp');
const { execOut } = require('./utils');

function buildWeb() {
	return execOut('pnpm build', { cwd: '../packages/web' });
}

function cleanUp() {
	return execOut('npx rimraf ./dist/', { cwd: '../packages/app' });
}

function buildApp() {
	return execOut('pnpm dist', { cwd: '../packages/app' });
}

exports.default = series(buildWeb, cleanUp, buildApp);
