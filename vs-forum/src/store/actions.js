import { serverTimestamp, writeBatch, increment, arrayUnion, updateDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { findById, docToResource } from "../helpers";
import { uid } from 'uid';


export default {
  async createPost({ commit, state }, post) {
    post.userId = state.authId;
    post.publishedAt = serverTimestamp();

    const db = getFirestore();
    const batch = writeBatch(db);
    const postRef = doc(db, "posts", uid(21));
    const threadRef = doc(db, "threads", post.threadId);
    const userRef = doc(db, "users", state.authId);

    batch.set(postRef, post);
    batch.update(threadRef, {
      posts: arrayUnion(postRef.id),
      contributors: arrayUnion(state.authId),
    });
    batch.update(userRef, {
      postsCount: increment(1),
    });
    await batch.commit();

    const newPost = await getDoc(postRef);
    commit('setItem', { resource: 'posts', item: { ...newPost.data(), id: newPost.id } });
    commit('appendPostToThread', { parentId: post.threadId, childId: newPost.id });
    commit('appendContributorToThread', { parentId: post.threadId, childId: state.authId });

  },
  async updatePost({ commit, state }, { text, id }) {
    const post = {
      text,
      edited: {
        at: serverTimestamp(),
        by: state.authId,
        moderated: false,
      }
    }

    const db = getFirestore();
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, post);

    const updatedPost = docToResource(await getDoc(postRef));
    commit('setItem', { resource: 'posts', item: updatedPost })

    return this.updatePost;
  },

  async createThread({ commit, state, dispatch }, { text, title, forumId }) {
    const userId = state.authId;
    const publishedAt = serverTimestamp();
    const thread = { forumId, title, publishedAt, userId, id: uid(21) };

    const db = getFirestore();
    const batch = writeBatch(db);
    const threadRef = doc(db, "threads", thread.id);
    const forumRef = doc(db, 'forums', forumId);
    const userRef = doc(db, "users", userId);
    batch.set(threadRef, thread);
    batch.update(forumRef, { threads: arrayUnion(threadRef.id) });
    batch.update(userRef, { threads: arrayUnion(threadRef.id) });

    await batch.commit();

    const newThread = await getDoc(threadRef);

    commit('setItem', { resource: 'threads', item: newThread.data() });
    commit('appendThreadToUser', { parentId: userId, childId: thread.id });
    commit('appendThreadToForum', { parentId: forumId, childId: thread.id });

    await dispatch('createPost', { text, threadId: thread.id });

    return findById(state.threads, thread.id);
  },
  async updateThread({ commit, state }, { text, title, id }) {
    const thread = findById(state.threads, id);
    const post = findById(state.posts, thread.posts[0]);

    const newThread = { ...thread, title };
    const newPost = { ...post, text };

    const db = getFirestore();
    const threadRef = doc(db, "threads", id);
    const postRef = doc(db, "posts", post.id);

    const batch = writeBatch(db);
    batch.set(threadRef, newThread);
    batch.set(postRef, newPost);

    await batch.commit();

    const savedThread = await getDoc(threadRef);
    const savedPost = await getDoc(postRef);

    commit('setItem', { resource: 'threads', item: docToResource(savedThread) });
    commit('setItem', { resource: 'posts', item: docToResource(savedPost) });

    return docToResource(savedThread);
  },

  updateUser({ commit }, user) {
    commit('setItem', { resource: "users", item: user });
  },
  async fetchAllCategories({ commit }) {
    console.log('fetching all categories');
    const querySnapshot = await getDocs(collection(getFirestore(), 'categories'));
    return querySnapshot.docs.map(c => {
      const item = { id: c.id, ...c.data() };
      commit('setItem', { resource: 'categories', item });
      return item;
    });
  },
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'threads', ids }),

  fetchAuthUser: ({ dispatch, state }) => dispatch('fetchItem', { resource: 'users', id: state.authId }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids }),

  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'posts', ids }),

  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids }),

  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id }),
  fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'categories', ids }),

  fetchItem({ commit }, { resource, id }) {
    console.log('fetching', resource, id);
    // const itemRef = await getDoc(doc(getFirestore(), resource, id));
    // const item = { ...itemRef.data(), id: itemRef.id };

    // commit("setItem", { resource, id, item });
    // return item;

    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(doc(getFirestore(), resource, id), (doc) => {
        console.log('snapshot', id);
        const item = { ...doc.data(), id: doc.id };
        commit('setItem', { resource, item });
        resolve(item);
      });
      commit('appendUnsubscribe', { unsubscribe });
    })
  },

  fetchItems: ({ dispatch }, { resource, ids }) => Promise.all(ids.map(id => dispatch('fetchItem', { resource, id }))),

  async unsubscribeAllSnapshots({ state, commit }) {
    console.log(`clearing ${state.unsubscribes?.length || 0} snapshot listeners`);
    state.unsubscribes.forEach(unsub => unsub());
    commit('clearAllUnsubscribes')
  }
}
