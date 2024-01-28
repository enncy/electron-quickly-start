<template>
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
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron';

setTimeout(() => {
	ipcRenderer.send('create-window', 'https://baidu.com');
}, 3000);
</script>

<style scoped lang="less"></style>
