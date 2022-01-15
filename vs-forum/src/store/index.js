import { createStore } from "vuex";
import { findById, upsert } from "../helpers";
import { getFirestore, getDoc, doc } from 'firebase/firestore';

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    // authId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    // authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id);
        if (!user) return null;
        return {
          ...user,
          get posts() {
            return state.posts.filter((p) => p.userId === user.id);
          },
          get postsCount() {
            return this.posts.length || 0;
          },
          get threads() {
            return state.threads.filter((t) => t.userId === user.id);
          },
          get threadsCount() {
            return this.threads.length || 0;
          },
        }
      }
    },
    thread: state => {
      return (id) => {
        const thread = findById(state.threads, id);
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId)
          },
          get repliesCount() {
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors?.length || 0;
          },
        }
      }
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = "ggg" + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setItem', { resource: 'posts', item: post });
      commit('appendPostToThread', { parentId: post.threadId, childId: post.id });
      commit('appendContributorToThread', { parentId: post.threadId, childId: state.authId });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "ggg" + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = { forumId, title, publishedAt, userId, id };

      commit('setItem', { resource: 'threads', item: thread });
      commit('appendThreadToUser', { parentId: userId, childId: id });
      commit('appendThreadToForum', { parentId: forumId, childId: id });

      dispatch('createPost', { text, threadId: id });

      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { text, title, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit('setItem', { resource: 'threads', item: newThread });
      commit('setItem', { resource: 'posts', item: newPost });

      return thread;
    },

    updateUser({ commit }, user) {
      commit('setItem', { resource: "users", item: user });
    },

    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'threads', id });
    },

    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'users', id });
    },

    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'posts', id });
    },

    async fetchItem({ commit }, { resource, id }) {
      console.log('fetching', resource, id);
      const itemRef = await getDoc(doc(getFirestore(), resource, id));
      const item = { ...itemRef.data(), id: itemRef.id };

      commit("setItem", { resource, id, item });
      return item;
    }
  },
  mutations: {
    setItem(state, { resource, item }) {
      upsert(state[resource], item);
    },

    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threadss' }),

    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
  }
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    resource[child] = resource[child] || [];

    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  }
}
