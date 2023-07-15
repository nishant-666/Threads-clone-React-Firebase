import React from "react";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

export default function SingleThread() {
  return (
    <div className="thread-card">
      <div className="flex JC-SB">
        <p className="name">Nishant Kumar</p>

        <p className="timestamp">Timestamp</p>
      </div>
      <p className="description">Description</p>

      <p className="hashtags">#hashtags</p>

      <div className="action-btns">
        <AiOutlineHeart size={30} />
        <AiOutlineComment size={30} />
      </div>

      <p className="likes-count">No. of Likes</p>
    </div>
  );
}
