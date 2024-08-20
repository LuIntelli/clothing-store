import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage, db } from "../firebase/firebaseConfig";
import { v4 } from "uuid";
import GetUrl from "../Components/GetUrl";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import UseId from "../Components/GetId";
import GetId from "../Components/GetId";

// resusable code
// hook handle image upload
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(storage, `photos/${v4()}`);

    //     // reference where the files should be saved
 
    const uploadImage  = uploadBytesResumable(storageRef, file);

    // create a collection for where the products will be saved
    const productsRef = collection(db,"products");

    uploadImage.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        // When the file is fully uploaded
        const url = await getDownloadURL(uploadImage.snapshot.ref);
        console.log(url)
        setUrl(url);
      }
    );
  }, [file]);

  return {
    progress,
    url,
    error,
  };
};

export default useStorage;
