import { createApp } from 'vue';
import App from './App.vue';
import { router } from './route';

window.addEventListener('error', function (e) {
	console.error(e);
});

window.addEventListener('unhandledrejection', function (e) {
	e.promise.catch((e) => {
		console.error(e);
	});
});

createApp(App).use(router).mount('#app');
