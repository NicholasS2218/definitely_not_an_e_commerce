// resources/js/router.js (Vue Router)
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import Favorite from './pages/favorite.vue';
import Cart from './pages/cart.vue';
import Profile from './pages/profile.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorite', name: 'favorite', component: Favorite },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/profile', name: 'profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;