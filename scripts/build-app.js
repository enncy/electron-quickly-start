const { series } = require('gulp');
const { execOut } = require('./utils');
const fs = require('fs');

function buildWeb() {
	return execOut('pnpm build', { cwd: '../packages/web' });
}

function cleanUp() {
	return execOut('npx rimraf ./dist/', { cwd: '../packages/app' });
}

function buildApp() {
	// mkdir node_modules 确保 node_modules 存在，否则 pnpm dist 会报错
	const exist = fs.existsSync('../packages/app/node_modules');
	if (!exist) {
		fs.mkdirSync('../packages/app/node_modules');
	}
	return execOut('pnpm dist', { cwd: '../packages/app' });
}

exports.default = series(buildWeb, cleanUp, buildApp);
