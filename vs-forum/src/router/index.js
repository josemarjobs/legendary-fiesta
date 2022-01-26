import { createRouter, createWebHistory } from 'vue-router';
import { findById } from '../helpers';
import store from '../store';

import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import ThreadShow from '../pages/ThreadShow.vue'
import ThreadCreate from '../pages/ThreadCreate.vue'
import ThreadEdit from '../pages/ThreadEdit.vue'
import Forum from '../pages/Forum.vue'
import Category from '../pages/Category.vue'
import Profile from '../pages/Profile.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'PageHome',
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
    meta: { requiresGuest: true },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    meta: { requiresGuest: true },
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter(to, from) {
      await store.dispatch('signOut');
      return { name: 'PageHome' };
    }
  },
  {
    path: '/me',
    component: Profile,
    name: 'Profile',
    meta: { toTop: true, smoothScroll: true, requiresAuth: true },
    // beforeEnter(to, from) {
    //   if (!store.state.authId) return { name: "PageHome" };
    //   // next();
    // },
  },
  {
    path: '/me/edit',
    props: { edit: true },
    component: Profile,
    name: 'EditProfile',
    meta: { requiresAuth: true },
  },
  {
    path: '/thread/:id',
    props: true,
    component: ThreadShow,
    name: 'ThreadShow',
    async beforeEnter(to, from, next) {
      await store.dispatch('fetchThread', { id: to.params.id });
      const threadExists = findById(store.state.threads, to.params.id);
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
    meta: { requiresAuth: true },
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true },
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {};
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll;
  }
});

router.beforeEach(async (to, from) => {
  await store.dispatch('initAuthentication');

  store.dispatch('unsubscribeAllSnapshots');

  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: "Login", query: { redirectTo: to.path } };
  }

  if (to.meta.requiresGuest && store.state.authId) {
    return { name: "PageHome" };
  }

})

export default router;