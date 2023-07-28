import React, { useEffect, useState } from "react";
import { getUserByID } from "../API/Firestore";

export default function RepliesIcon({ userId }) {
  const [thread, setThread] = useState({});
  useEffect(() => {
    getUserByID(userId, setThread);
  }, [userId]);

  if (thread?.profileImage)
    return (
      <div className="reply-user-image">
        <div className="vertical-line"></div>
        <img src={thread?.profileImage} />
      </div>
    );
}
