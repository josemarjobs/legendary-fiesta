import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getPost = (id) => {
    const post = ref(null);
    const error = ref(null);

    const load = async () => {
        try {
            let res = await projectFirestore.collection('posts').doc(id).get();
            if (!res.exists) {
                throw Error("The post does not exist!");
            }
            post.value = { ...res.data(), id: id };
        } catch (err) {
            error.value = err.message;
        }
    };
    return { post, error, load };
}

export default getPost;

const oldGetPost = (id) => {
    const post = ref(null);
    const error = ref(null);

    const load = async () => {
        try {

            // simultate delay
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            })

            let data = await fetch("http://localhost:3000/posts/" + id);
            if (!data.ok) {
                throw Error("Cannot get the post with id: " + id);
            }
            post.value = await data.json();
        } catch (err) {
            error.value = err.message;
        }
    };
    return { post, error, load };
}
