import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
    const error = ref(null);


    const addDoc = async (doc) => {
        error.value = null;
        try {
            await projectFirestore.collection(collection).add(doc);
        } catch (e) {
            console.error('ERROR: ', e.message);
            error.value = 'Could not add the document';
        }
    };

    return { error, addDoc };
};

export default useCollection;