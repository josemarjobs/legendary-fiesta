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
    // authId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
    // authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    // authId: 'Miej9zSGMRZKDvMXzfxjVOyv3RF3'
    authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  },
  getters,
  actions,
  mutations
});
