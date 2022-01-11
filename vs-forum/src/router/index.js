import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue'
import ThreadShow from '../pages/ThreadShow.vue'
import NotFound from '../pages/NotFound.vue'
import Forum from '../pages/Forum.vue'
import Category from '../pages/Category.vue'

import sourceData from '../data.json';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'PageHome',
  },
  {
    path: '/thread/:id',
    props: true,
    component: ThreadShow,
    name: 'ThreadShow',
    beforeEnter(to, from, next) {
      const threadExists = sourceData.threads.find(t => t.id === to.params.id);
      if (threadExists) {
        return next();
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
    }
  },
  {
    path: '/category/:id',
    props: true,
    name: 'Category',
    component: Category,
  },
  {
    path: '/forum/:id',
    props: true,
    component: Forum,
    name: 'ForumShow',
    beforeEnter(to, from, next) {
      // const threadExists = sourceData.threads.find(t => t.id === to.params.id);
      // if (threadExists) {
      //   return next();
      // } else {
      //   next({
      //     name: 'NotFound',
      //     params: { pathMatch: to.path.substring(1).split('/') },
      //     query: to.query,
      //     hash: to.hash,
      //   });
      // }
      next();
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});

