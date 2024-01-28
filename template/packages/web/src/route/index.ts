import { createRouter, createWebHashHistory } from 'vue-router';
import index from '@/pages/index.vue';

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: index
		}
	]
});
