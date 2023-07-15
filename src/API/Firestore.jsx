import { app, database } from "../firebaseConfig";
import Toast from "../Components/Common/Toast";
import moment from "moment";

import { addDoc, collection } from "firebase/firestore";

let threadsCollection = collection(database, "threads");
let usersCollection = collection(database, "users");

export const createUser = (name, email) => {
  addDoc(usersCollection, {
    name,
    email,
  });
};

export const createThread = (payload) => {
  addDoc(threadsCollection, {
    name: payload.name,
    email: payload.email,
    threadData: payload.threadData,
    timestamp: moment().format(),
  });

  Toast("Thread Posted", "success");
};
