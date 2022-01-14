import { createStore } from "vuex";
import sourceData from "../data.json";
import { findById, upsert } from "../helpers";

export default createStore({
  state: {
    ...sourceData,
    // authId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    // authId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
  },
  getters: {
    authUser: state => {
      const user = findById(state.users, state.authId);
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
  actions: {
    createPost({ commit, state }, post) {
      post.id = "ggg" + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit('setPost', { post });
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId });
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = "ggg" + Math.random();
      const userId = state.authId;
      const publishedAt = Math.floor(Date.now() / 1000);
      const thread = { forumId, title, publishedAt, userId, id };

      commit('setThread', { thread });
      commit('appendThreadToUser', { userId, threadId: id });
      commit('appendThreadToForum', { forumId, threadId: id });

      dispatch('createPost', { text, threadId: id });

      return findById(state.threads, id);
    },
    async updateThread({ commit, state }, { text, title, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit('setThread', { thread: newThread });
      commit('setPost', { post: newPost });

      return thread;
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.posts, post);
    },

    setThread(state, { thread }) {
      upsert(state.threads, thread);
    },

    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex(u => u.id === userId);
      state.users[userIndex] = user;
    },

    appendPostToThread(state, { postId, threadId }) {
      const thread = findById(state.threads, threadId);
      thread.posts = thread.posts || [];
      thread.posts.push(postId);
    },

    appendThreadToForum(state, { threadId, forumId }) {
      const forum = findById(state.forums, forumId);
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },

    appendThreadToUser(state, { threadId, userId }) {
      const user = findById(state.users, userId);
      user.threads = user.threads || [];
      user.threads.push(threadId);
    }
  }
});