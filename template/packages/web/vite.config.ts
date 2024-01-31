import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
// 安装 vite-plugin-electron 的时候，就同时安装了 vite-plugin-electron-renderer
import electronRender from 'vite-plugin-electron-renderer';
// eslint-disable-next-line no-unused-vars
import commonjs from 'vite-plugin-commonjs';

import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		// 打包代码到 app/public 目录下，build 之后，app 目录下的代码就是最终的html代码
		outDir: '../app/public',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	},
	server: {
		open: false
	},
	// 不要更改，这里是打包后的文件路径，如果更改，打包后的文件路径会出错
	base: '',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			root: path.resolve(__dirname),
			app: path.resolve(__dirname, './app')
		}
	},
	plugins: [
		vue(),
		// 处理一些外部 CDN 引入
		// commonjs({ filter: (id) => (id.includes('xlsx') ? undefined : false) }),
		// 不安装 electronRender 会报错 Error: Module "path" has been externalized for browser compatibility
		electronRender(),
		// 打包分析
		visualizer()
	]
});
