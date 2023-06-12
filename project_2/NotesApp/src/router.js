import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('./pages/BinPage.vue'),
  },
  {
    path: '/notes/add',
    name: 'add-note',
    component: () => import('./pages/AddNote.vue'),
  },
  {
    path: '/notes/edit/:id',
    name: 'edit-note',
    component: () => import('./pages/EditNote.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
