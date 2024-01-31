#!/usr/bin/env node

import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

(async () => {
	const { project_name, project_describe } = await prompts([
		{
			type: 'text',
			name: 'project_name',
			message: "What's your project name?",
			initial: 'my-electron-app',
			validate: (value) => {
				if (!value) return 'project name is required';
				if (fs.existsSync(path.resolve(process.cwd(), value))) return 'project already exists';
				return true;
			},
			format: (value) => value.trim()
		},
		{
			type: 'text',
			name: 'project_describe',
			message: "What's your app describe?",
			initial: 'an electron app',
			validate: (value) => {
				if (!value) return 'app describe is required';
				return true;
			},
			format: (value) => value.trim()
		}
	]);

	const sourceDir = path.resolve(__dirname, 'template');
	const destDir = path.resolve(process.cwd(), project_name);

	copy(sourceDir, destDir);

	const packageJson = JSON.parse(fs.readFileSync(path.resolve(destDir, 'package.json'), 'utf-8'));
	packageJson.name = project_name;
	fs.writeFileSync(path.resolve(destDir, 'package.json'), JSON.stringify(packageJson, null, 2));

	/**
	 * 替换 electron 打包配置文件参数
	 */
	const electronBuilderJsonPath = path.resolve(destDir, 'packages', 'app', 'electron.builder.json');
	const electronBuilderJsonContent = fs
		.readFileSync(electronBuilderJsonPath, 'utf-8')
		.replace('{ELECTRON-APP-NAME}', project_name)
		.replace('{ELECTRON-APP-DESC}', project_describe);
	fs.writeFileSync(electronBuilderJsonPath, JSON.stringify(JSON.parse(electronBuilderJsonContent), null, 2));

	/**
	 * 替换 electron 入口文件参数
	 */
	const appIndexPath = path.resolve(destDir, 'packages', 'app', 'index.ts');
	const appIndexContent = fs.readFileSync(appIndexPath, 'utf-8').replace('{ELECTRON-APP-NAME}', project_name);
	fs.writeFileSync(appIndexPath, appIndexContent);

	/**
	 * 替换 html 标题
	 */
	const htmlPath = path.resolve(destDir, 'packages', 'web', 'index.html');
	const htmlContent = fs.readFileSync(htmlPath, 'utf-8').replace('{ELECTRON-APP-NAME}', project_name);
	fs.writeFileSync(htmlPath, htmlContent);

	const l = console.log;

	l('');
	l(project_name + ' created!');
	l('');
	l('run command below to init project: ');
	l('');
	l('	cd ' + project_name);
	l('	npm install pnpm -g');
	l('	pnpm install');
	l('');
	l('and open tow terminal to run command below: ');
	l('');
	l('	npm run dev:web');
	l('	npm run dev:server');
})();

function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}
