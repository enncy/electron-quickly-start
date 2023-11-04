<template>
	<div class="render-container">
		<div class="header">
			<div style="padding-left: 12px">title</div>
		</div>
		<div class="body">
			<div style="display: flex; align-items: center; justify-content: center; height: 100%">
				<div>
					<h1>🎉 welcome to electron-quickly-start</h1>
					<h2 style="display: flex; align-items: center; justify-content: center">
						<img
							width="64"
							src="@/../public/img/vue-logo.png"
						/>
						+
						<img
							width="64"
							src="@/../public/img/electron-logo.svg"
						/>
					</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { remote } from '../utils/remote';

console.log(remote);

onMounted(() => {
	if (remote.process.platform === 'win32') {
		const release = getWindowsRelease();
		if (release !== 'win11') {
			document.documentElement.classList.add('window-frame');
		}
	}
});

/** 获取 windows 版本号 */
function getWindowsRelease() {
	const release = remote.process.getSystemVersion();
	if (release.startsWith('6.1')) {
		return 'win7';
	} else if (parseInt(release.split('.').at(-1) || '0') > 22000) {
		return 'win11';
	} else {
		return 'win10';
	}
}
</script>

<style scoped lang="less">
.header {
	// electron 可拖拽
	-webkit-app-region: drag;
	width: 100%;
	display: flex;
	align-items: center;
	/** 系统自带控件高度为 32 */
	height: 32px;
	cursor: default;
	border-bottom: 1px solid #f3f3f3;
	z-index: 999999;
	position: relative;
	background-color: white;
}

.body {
	overflow: auto;
}

.render-container {
	display: grid;
	grid-template-rows: 32px calc(100vh - 32px);
	grid-template-areas:
		'header'
		'body';
}
</style>
