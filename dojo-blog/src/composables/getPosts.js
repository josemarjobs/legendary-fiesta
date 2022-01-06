import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getPosts = () => {
    const posts = ref([]);
    const error = ref(null);

    const load = async () => {
        try {
            const res = await projectFirestore.collection('posts')
                .orderBy('createdAt', 'desc')
                .get();
            posts.value = res.docs.map(doc => {
                // console.log(doc.data());
                return { ...doc.data(), id: doc.id };
            });

        } catch (err) {
            error.value = err.message;
        }
    };
    return { posts, error, load };
}

export default getPosts;

const oldGetPosts = () => {
    const posts = ref([]);
    const error = ref(null);

    const load = async () => {
        try {
            // simultate delay
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            });
            let data = await fetch("http://localhost:3000/posts");
            if (!data.ok) {
                throw Error("no data available");
            }
            posts.value = await data.json();
        } catch (err) {
            error.value = err.message;
        }
    };
    return { posts, error, load };
}
