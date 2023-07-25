import { app, database, auth } from "../firebaseConfig";
import Toast from "../Components/Common/Toast";
import moment from "moment";

import {
  addDoc,
  updateDoc,
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

let threadsCollection = collection(database, "threads");
let usersCollection = collection(database, "users");
let likeRef = collection(database, "likes");
let repliesRef = collection(database, "replies");
let notificationCollection = collection(database, "notification");

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

export const likeThread = (
  userId,
  recipientUserId,
  threadData,
  threadID,
  liked
) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${threadID}`);
    let docToNotify = doc(
      notificationCollection,
      `${recipientUserId}_${threadID}`
    );

    if (liked) {
      deleteDoc(docToLike);
      deleteDoc(docToNotify);
    } else {
      setDoc(docToLike, { userId, threadID });

      if (userId !== recipientUserId) {
        const notificationData = {
          userName: auth.currentUser.displayName,
          recipientUserId: recipientUserId,
          senderUserEmail: auth.currentUser.email,
          senderUserId: auth.currentUser.uid,
          type: "like",
          threadID: threadID,
          threadData: threadData,
          timestamp: moment().format(),
          isRead: false,
        };
        setDoc(docToNotify, notificationData);
      }
    }
  } catch (err) {
    console.log(err, "error");
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

export const postReplies = async (
  recipientUserId,
  threadData,
  userId,
  threadID,
  reply,
  timeStamp,
  currentUserName
) => {
  try {
    addDoc(repliesRef, {
      threadID,
      reply,
      timeStamp,
      name: currentUserName,
    });

    if (userId != recipientUserId) {
      const notificationData = {
        userName: auth.currentUser.displayName,
        recipientUserId: recipientUserId,
        senderUserEmail: auth.currentUser.email,
        senderUserId: auth.currentUser.uid,
        type: "comment",
        threadID: threadID,
        threadData: threadData,
        timestamp: moment().format(),
        isRead: false,
      };

      addDoc(notificationCollection, notificationData);
    }
  } catch (err) {
    console.log(err);
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

export const getCurrentUserProfile = async (email, setCurrentProfile) => {
  try {
    let currentUserQuery = query(usersCollection, where("email", "==", email));
    onSnapshot(currentUserQuery, (response) => {
      setCurrentProfile(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (err) {
    Toast(err, "error");
  }
};

export const getUserByID = async (id, setCurrentProfile) => {
  try {
    let currentUser = doc(usersCollection, id);
    await onSnapshot(currentUser, (response) => {
      setCurrentProfile(response.data());
    });
  } catch (err) {
    Toast(err, "error");
  }
};

export const getUserByEmail = async (email, setCurrentProfile) => {
  try {
    let currentUserQuery = query(usersCollection, where("email", "==", email));
    onSnapshot(currentUserQuery, (response) => {
      setCurrentProfile(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (err) {
    Toast(err, "error");
  }
};

export const updateProfile = (currentID, payload) => {
  let docToUpdate = doc(database, "users", currentID);

  updateDoc(docToUpdate, payload);

  Toast("Profile Updated", "success");
};

export const getCurrenProfileThreads = async (email, setCurrentThreads) => {
  let currentThreadsQuery = query(
    threadsCollection,
    where("email", "==", email)
  );
  onSnapshot(currentThreadsQuery, (response) => {
    setCurrentThreads(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getNotifications = async (userId, setNotifications) => {
  const getNotifQuery = query(
    notificationCollection,
    where("recipientUserId", "==", userId),
    orderBy("timestamp", "desc")
  );
  onSnapshot(getNotifQuery, (response) => {
    setNotifications(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const readNotifications = async (id) => {
  let docToUpdate = doc(notificationCollection, id);

  updateDoc(docToUpdate, { isRead: true });
};

export const getSingleThread = async (threadID, setSingleThread) => {
  try {
    let currentThread = doc(threadsCollection, threadID);

    await onSnapshot(currentThread, (response) => {
      setSingleThread(response.data());
    });
  } catch (err) {
    Toast(err, "error");
  }
};
