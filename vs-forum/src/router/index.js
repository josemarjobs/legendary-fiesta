import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue'
import ThreadShow from '../pages/ThreadShow.vue'
import ThreadCreate from '../pages/ThreadCreate.vue'
import Forum from '../pages/Forum.vue'
import Category from '../pages/Category.vue'
import Profile from '../pages/Profile.vue'
import NotFound from '../pages/NotFound.vue'

import sourceData from '../data.json';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'PageHome',
  },
  {
    path: '/me',
    component: Profile,
    name: 'Profile',
    meta: { toTop: true, smoothScroll: true, }
  },
  {
    path: '/me/edit',
    props: { edit: true },
    component: Profile,
    name: 'EditProfile',
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
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
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
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  }
});

