import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    error.value = null;
    isPending.value = true;
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error('Could not complete the signup');
        }
        await res.user.updateProfile({ displayName: displayName });
        error.value = null;
        return res;
    } catch (err) {
        console.error('ERR: ', err.message);
        error.value = err.message;
    } finally {
        isPending.value = false;
    }
}


const useSignup = () => {
    return { error, isPending, signup }
}

export default useSignup;