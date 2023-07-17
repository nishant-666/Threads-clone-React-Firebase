import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "./Firestore";

export const uploadImage = (file, currentID, setImageProgress) => {
  const picsRef = ref(storage, `${file.name}`);
  const uploadTask = uploadBytesResumable(picsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setImageProgress(progress);
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        updateProfile(currentID, { profileImage: response });
        setImageProgress(0);
      });
    }
  );
};
