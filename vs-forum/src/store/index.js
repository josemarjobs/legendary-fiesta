import { createStore } from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default createStore({
  state: {
    unsubscribes: [],
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null
  },
  getters,
  actions,
  mutations
});
