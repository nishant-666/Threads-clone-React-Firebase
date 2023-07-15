import React from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { formatTime } from "../Helpers/formatTime";

export default function SingleThread({ thread }) {
  return (
    <div className="thread-card">
      <div className="flex JC-SB">
        <p className="name">{thread.name}</p>

        <p className="timestamp">{formatTime(thread.timestamp)}</p>
      </div>
      <p className="description">{thread.threadData}</p>

      {/* <p className="hashtags">#hashtags</p> */}

      <div className="action-btns">
        <AiOutlineHeart size={30} />
        <AiOutlineComment size={30} />
      </div>

      <p className="likes-count">No. of Likes</p>
    </div>
  );
}
