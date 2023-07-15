import { app, database } from "../firebaseConfig";
import { createContext, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";

export const FirestoreContext = createContext({});

let threadsCollection = collection(database, "threads");

const FirestoreProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);

  const getAllThreads = async () => {
    onSnapshot(threadsCollection, (response) => {
      setThreads(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    getAllThreads();
  }, []);

  return (
    <FirestoreContext.Provider value={{ threads }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
