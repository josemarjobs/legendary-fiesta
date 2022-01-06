import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged(u => {
    console.log('auth state changed, current user is: ', u);
    user.value = u;
});


const getUser = () => {
    return { user }
}

export default getUser;