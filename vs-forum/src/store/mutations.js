import { findById, upsert, docToResource } from "../helpers";

export default {
  setItem(state, { resource, item }) {
    upsert(state[resource], docToResource(item));
  },
  setAuthId(state, authId) {
    state.authId = authId;
  },
  appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

  appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threadss' }),

  appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' }),

  appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),

  setAuthUserUnsubscribe(state, unsubscribe) {
    state.authUserUnsubscribe = unsubscribe;
  },
  setAuthObserverUnsubscribe(state, unsubscribe) {
    state.authObserverUnsubscribe = unsubscribe;
  },
  appendUnsubscribe(state, { unsubscribe }) {
    state.unsubscribes.push(unsubscribe);
  },
  clearAllUnsubscribes(state) {
    state.unsubscribes = [];
  }
}


function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId);
    if (!resource) {
      console.log(`Appending ${child} ${childId} to ${parent} ${parentId}, failed because parent doesn't exist`);
      return;
    }
    resource[child] = resource[child] || [];

    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  }
}
