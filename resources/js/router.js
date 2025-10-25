// resources/js/router.js (Vue Router)
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import Shop from './pages/shop.vue';
import Cart from './pages/cart.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/shop', name: 'shop', component: Shop },
  { path: '/cart', name: 'cart', component: Cart }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;