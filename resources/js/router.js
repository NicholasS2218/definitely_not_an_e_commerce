// resources/js/router.js (Vue Router)
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import Products from './pages/products.vue';
import About from './pages/about.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;