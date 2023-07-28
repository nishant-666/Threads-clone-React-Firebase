import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import RepliesIcon from "./RepliesIcon";

export default function Replies() {
  let location = useLocation();
  let navigate = useNavigate();
  let replies = location?.state?.replies;

  return (
    <div>
      <div className="reply-details">
        <div className="thread-header">
          <BiArrowBack
            className="react-icon"
            size={30}
            onClick={() => navigate(-1)}
          />
          <p>Replies</p>
        </div>
      </div>
      {replies.length > 0 ? (
        replies.map((comment, index) => {
          return (
            <div className="all-replies" key={index}>
              <div className="reply-head">
                <RepliesIcon userId={comment.userId} />
              </div>

              <div>
                <p className="reply-name">{comment.name}</p>
                <p className="comment">{comment.reply}</p>
                <p className="reply-timestamp">{comment.timeStamp}</p>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
