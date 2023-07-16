import { app, database } from "../firebaseConfig";
import Toast from "../Components/Common/Toast";
import moment from "moment";

import {
  addDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

let threadsCollection = collection(database, "threads");
let usersCollection = collection(database, "users");
let likeRef = collection(database, "likes");
let repliesRef = collection(database, "replies");

export const createUser = (name, email) => {
  addDoc(usersCollection, {
    name,
    email,
  });
};

export const createThread = (payload) => {
  addDoc(threadsCollection, {
    ...payload,
    timestamp: moment().format(),
  });

  Toast("Thread Posted", "success");
};

export const likeThread = (userId, threadID, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${threadID}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, threadID });
      Toast("Thread Liked", "success");
    }
  } catch (err) {
    Toast(err, "error");
  }
};

export const getLikesByUser = (userId, threadID, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("threadID", "==", threadID));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postReplies = async (threadID, reply, timeStamp, name) => {
  try {
    await addDoc(repliesRef, {
      threadID,
      reply,
      timeStamp,
      name,
    });
  } catch (err) {
    Toast(err, "error");
  }
};

export const getAllReplies = (threadID, setReplies) => {
  try {
    let singleThreadQuery = query(
      repliesRef,
      where("threadID", "==", threadID)
    );

    onSnapshot(singleThreadQuery, (response) => {
      const replies = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setReplies(replies);
    });
  } catch (err) {
    console.log(err);
  }
};
