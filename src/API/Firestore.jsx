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
  likedBy,
  userId,
  threadData,
  currentUserID,
  threadID,
  liked
) => {
  try {
    let docToLike = doc(likeRef, `${likedBy}_${threadID}`);
    let docToNotify = doc(notificationCollection, `${likedBy}_${threadID}`);
    if (liked) {
      deleteDoc(docToLike);
      deleteDoc(docToNotify);
    } else {
      setDoc(docToLike, { likedBy, threadID });

      if (currentUserID !== userId) {
        const notificationData = {
          userName: auth.currentUser.displayName,
          recipientUserId: userId,
          senderUserEmail: auth.currentUser.email,
          senderUserId: auth.currentUser.uid,
          type: "like",
          threadID: threadID,
          threadData: threadData,
          timestamp: moment().format(),
          isRead: false,
        };
        addDoc(notificationCollection, notificationData);
      }
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

      const isLiked = likes.some((like) => like.likedBy === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postReplies = async (
  likedFor,
  threadName,
  currentUserID,
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

    if (currentUserID != likedFor) {
      const notificationData = {
        userName: auth.currentUser.displayName,
        recipientUserId: likedFor,
        senderUserEmail: auth.currentUser.email,
        senderUserId: auth.currentUser.uid,
        type: "comment",
        threadID: threadID,
        threadData: threadName,
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

export const getUserByID = async (userEmail, setCurrentProfile) => {
  try {
    let currentUserQuery = query(
      usersCollection,
      where("email", "==", userEmail)
    );
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

export const getNotifications = async (recipientUserId, setNotifications) => {
  const getNotifQuery = query(
    notificationCollection,
    where("recipientUserId", "==", recipientUserId),
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
