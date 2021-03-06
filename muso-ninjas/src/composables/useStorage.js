import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import getUser from './getUser';

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);
  const isPending = ref(false);

  const uploadImage = async (file) => {
    isPending.value = true;
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      console.log('upload result:', res);
      url.value = await res.ref.getDownloadURL();
    } catch (e) {
      console.error('ERROR UPLOADING:', e.message);
      error.value = e.message;
    } finally {
      isPending.value = false;
    }
  };

  const deleteImage = async (path) => {
    isPending.value = true;
    const storageRef = projectStorage.ref(path);
    try {
      await storageRef.delete();
    } catch (err) {
      console.log('ERROR DELETING FILE:', err.message);
      error.value = err.message;
    }
  }

  return { url, filePath, isPending, error, uploadImage, deleteImage };
}

export default useStorage;