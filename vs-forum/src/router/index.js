import { createRouter, createWebHistory } from 'vue-router';

import PageHome from '../components/PageHome.vue'
import PageThread from '../components/PageThread.vue'
import PageNotFound from '../components/PageNotFound.vue'


const routes = [
  {
    path: '/',
    component: PageHome,
    name: 'PageHome',
  }, {
    path: '/thread/:id',
    props: true,
    component: PageThread,
    name: 'ThreadShow',
  }, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

