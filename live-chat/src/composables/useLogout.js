import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const logout = async () => {
    error.value = null;

    try {
        await projectAuth.signOut();
    } catch (err) {
        console.error('ERR: ', err.message);
        error.value = 'Could not logout';
    }
}


const useLogout = () => {
    return { error, logout }
}

export default useLogout;