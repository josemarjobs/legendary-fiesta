import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;
    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error('Could not complete the login');
        }
        error.value = null;
        return res;
    } catch (err) {
        console.error('ERR: ', err.message);
        error.value = 'Incorrect login credentials';
    } finally {
        isPending.value = false;
    }
}


const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin;