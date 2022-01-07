import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);

    const addDoc = async (doc) => {
        error.value = null;
        isPending.value = true;
        try {
            await projectFirestore.collection(collection).add(doc);
        } catch (e) {
            console.error('ERROR: ', e.message);
            error.value = 'Could not add the document';
        } finally {
            isPending.value = false;
        }
    };

    return { error, isPending, addDoc };
};

export default useCollection;