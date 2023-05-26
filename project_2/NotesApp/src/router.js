import { createRouter, createWebHistory } from "vue-router";

import NotesPage from './pages/NotesPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: NotesPage,
  },
  {
    path: '/notes/add',
    name: 'add-note',
    component: () => import('./pages/AddNote.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
