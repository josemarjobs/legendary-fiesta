import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);
const isPending = ref(false);
const logout = async () => {
    error.value = null;
    isPending.value = true;
    try {
        await projectAuth.signOut();
    } catch (err) {
        console.error('ERR: ', err.message);
        error.value = 'Could not logout';
    } finally {
        isPending.value = false;
    }
}


const useLogout = () => {
    return { error, isPending, logout }
}

export default useLogout;