import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { domains } from '@/data';

const Home = () => import('@/views/Home.vue');
const CategoryPage = () => import('@/views/CategoryPage.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/work/:id',
    name: 'category',
    component: CategoryPage,
    // Guard against unknown category ids -> send home.
    beforeEnter: (to) => {
      const id = String(to.params.id);
      if (!domains.some((d) => d.id === id)) return { name: 'home' };
      return true;
    },
  },
  // Fallback -> home
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
];

const getBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/portfolio')) {
    return '/portfolio/';
  }
  return '/';
};

const router = createRouter({
  history: createWebHistory(getBaseUrl()),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});

export default router;
