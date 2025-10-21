// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Page1 from './views/Page1.vue';
import Page2 from './views/Page2.vue';
import Page3 from './views/Page3.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/page1', component: Page1 },
  { path: '/page2', component: Page2 },
  { path: '/page3', component: Page3 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

export default router;
