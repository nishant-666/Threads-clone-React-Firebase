import { app, database } from "../firebaseConfig";
import { createContext, useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";

export const FirestoreContext = createContext({});

let usersCollection = collection(database, "users");
let threadsCollection = collection(database, "threads");

let currentEmail = localStorage.getItem("userEmail");

const FirestoreProvider = ({ children }) => {
  const [threads, setThreads] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const getAllThreads = async () => {
    onSnapshot(threadsCollection, (response) => {
      setThreads(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  const getCurrentUser = async () => {
    let currentUserQuery = query(
      usersCollection,
      where("email", "==", currentEmail)
    );
    onSnapshot(currentUserQuery, (response) => {
      setCurrentUser(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  useEffect(() => {
    getAllThreads();
    getCurrentUser();
  }, []);

  return (
    <FirestoreContext.Provider value={{ threads, currentUser }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
