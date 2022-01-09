import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      error.value = null;
      return res;
    } catch (e) {
      console.log("ERROR DELETING DOC:", e.message);
      error.value = 'Error deleting document'
      isPending.value = false;
    }
  }

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      error.value = null;
      return res;
    } catch (e) {
      console.log("ERROR UPDATING DOC:", e.message);
      error.value = 'Error updating document'
      isPending.value = false;
    }
  }

  return { error, isPending, deleteDoc, updateDoc };
}

export default useDocument;
