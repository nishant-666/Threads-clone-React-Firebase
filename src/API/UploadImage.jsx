import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "./Firestore";
import Compressor from "compressorjs";

export const uploadImage = (file, currentID, setImageProgress) => {
  new Compressor(file, {
    quality: 0.6,
    success: (compressedResult) => {
      const picsRef = ref(storage, `${compressedResult.name}`);
      const uploadTask = uploadBytesResumable(picsRef, compressedResult);

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
    },
  });
};
