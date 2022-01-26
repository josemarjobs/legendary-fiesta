import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/tailwind.css'

import { initializeApp } from "firebase/app";
import firebaseConfig from './config/firebase';

initializeApp(firebaseConfig);

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
