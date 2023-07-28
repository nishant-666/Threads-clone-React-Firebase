import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { likeThread, getLikesByUser } from "../API/Firestore";

import { PlusOutlined } from "@ant-design/icons";
import CommonButton from "./Common/Button";
import Input from "./Common/Input";
import { getCurrentTimeStamp } from "../Helpers/useMoment";
import { postReplies, getAllReplies } from "../API/Firestore";
import ModalComponent from "./Common/Modal";
import { useNavigate } from "react-router-dom";
import { getUserByID } from "../API/Firestore";
import RepliesIcon from "./RepliesIcon";

export default function ActionBtns({
  userId,
  recipientUserId,
  threadData,
  threadID,
  currentUserName,
}) {
  let navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const handleLike = () => {
    likeThread(userId, recipientUserId, threadData, threadID, liked);
  };

  const getReplies = (event) => {
    let { value } = event.target;
    setReply(value);
  };

  const addComment = () => {
    postReplies(
      recipientUserId,
      threadData,
      userId,
      threadID,
      reply,
      getCurrentTimeStamp("LLL"),
      currentUserName
    );
    setReply("");
    setShowCommentBox(false);
  };

  const openReplies = () => {
    navigate("/replies", {
      state: {
        replies,
        userId,
      },
    });
  };

  useEffect(() => {
    return () => {
      getLikesByUser(userId, threadID, setLiked, setLikesCount);
      getAllReplies(threadID, setReplies);
    };
  }, [userId, threadID]);

  useEffect(() => {
    getUserByID(userId, setCurrentProfile);
  }, [userId]);

  return (
    <div>
      <div className="action-container">
        {liked ? (
          <AiFillHeart
            className="react-icon"
            fill="#f44336"
            size={30}
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart
            className="react-icon"
            size={30}
            onClick={handleLike}
          />
        )}

        <AiOutlineComment
          onClick={() => setShowCommentBox(!showCommentBox)}
          className="react-icon"
          size={30}
        />
      </div>
      <div className="count" onClick={openReplies}>
        <div>
          {replies.map((reply) => (
            <div className="reply-head">
              <RepliesIcon userId={reply.userId} />
            </div>
          ))}
        </div>
        <div className="reply-count">
          {replies.length !== 0
            ? replies.length === 1
              ? `${replies.length} Reply `
              : `${replies.length} Replies `
            : ""}
          {likesCount !== 0
            ? likesCount === 1
              ? ` • ${likesCount} Like`
              : ` • ${likesCount} Likes`
            : ""}
        </div>
      </div>
      <ModalComponent
        title="Add a Comment.."
        showCommentBox={showCommentBox}
        setShowCommentBox={setShowCommentBox}
      >
        <div className="comment-input">
          <Input
            value={reply}
            handleInput={getReplies}
            placeholder="Add a Reply.."
          />
          <CommonButton onClick={addComment} PlusOutlined={<PlusOutlined />} />
        </div>
      </ModalComponent>
    </div>
  );
}
