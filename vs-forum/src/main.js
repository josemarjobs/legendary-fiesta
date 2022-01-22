import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/tailwind.css'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './config/firebase';

initializeApp(firebaseConfig);
onAuthStateChanged(getAuth(), (user) => {
  store.dispatch('unsubscribeAuthUserSnapshot');
  if (user) {
    store.dispatch('fetchAuthUser')
  }
  store.dispatch('authIsReady')
});

const forumApp = createApp(App);
forumApp.use(router);
forumApp.use(store);

const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(fileName => {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  let baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  );

  forumApp.component(baseComponentName, baseComponentConfig);
});


forumApp.mount('#app');
