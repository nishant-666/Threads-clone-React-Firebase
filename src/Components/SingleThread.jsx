import React, { useContext } from "react";
import ActionBtns from "./ActionBtns";
import { formatTime } from "../Helpers/formatTime";
import { FirestoreContext } from "../Contexts/FirestoreContext";

export default function SingleThread({ thread }) {
  let { currentUser } = useContext(FirestoreContext);
  let currentUserID = currentUser[0]?.id;
  let currentUserName = currentUser[0]?.name;

  return (
    <>
      <div className="thread-card">
        <div className="flex JC-SB">
          <div className="vertical-line"></div>
          <p className="name">{thread.name}</p>

          <p className="timestamp">{formatTime(thread.timestamp)}</p>
        </div>
        <div className="description">
          {thread.threadData.map((thread, index) => (
            <p key={index}>{thread}</p>
          ))}
        </div>

        {/* <p className="hashtags">#hashtags</p> */}

        <div className="action-btns">
          <ActionBtns
            userId={currentUserID}
            threadID={thread.id}
            currentUserName={currentUserName}
          />
        </div>
      </div>
    </>
  );
}
