import React, { useEffect, useState, useContext } from "react";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { likeThread, getLikesByUser } from "../API/Firestore";

import { PlusOutlined } from "@ant-design/icons";
import CommonButton from "./Common/Button";
import Input from "./Common/Input";
import { getCurrentTimeStamp } from "../Helpers/useMoment";
import { postReplies, getAllReplies } from "../API/Firestore";
import ModalComponent from "./Common/Modal";

export default function ActionBtns({
  userId,
  recipientUserId,
  threadData,
  threadID,
  currentUserName,
}) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      getLikesByUser(userId, threadID, setLiked, setLikesCount);
      getAllReplies(threadID, setReplies);
    };
  }, [userId, threadID]);

  return (
    <div>
      <div className="action-container">
        {liked ? (
          <div className="like-container">
            <AiFillHeart
              className="react-icon"
              fill="#f44336"
              size={30}
              onClick={handleLike}
            />
            <p>{likesCount}</p>
          </div>
        ) : (
          <div className="like-container">
            <AiOutlineHeart
              className="react-icon"
              size={30}
              onClick={handleLike}
            />
            <p>{likesCount}</p>
          </div>
        )}
        <div className="comment-box">
          <AiOutlineComment
            onClick={() => setShowCommentBox(!showCommentBox)}
            className="react-icon"
            size={30}
          />
        </div>
      </div>
      <ModalComponent
        setIsModalOpen={setIsModalOpen}
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
      {/* {showCommentBox ? (
        <>
          <div className="comment-input">
            <Input
              value={reply}
              handleInput={getReplies}
              placeholder="Add a Reply.."
            />
            {reply.length === 0 ? (
              <></>
            ) : (
              <CommonButton
                onClick={addComment}
                PlusOutlined={<PlusOutlined />}
              />
            )}
          </div>
          {replies.length > 0 ? (
            replies.map((comment, index) => {
              return (
                <div className="all-replies" key={index}>
                  <p className="reply-name">{comment.name}</p>
                  <p className="comment">{comment.reply}</p>

                  <p className="reply-timestamp">{comment.timeStamp}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )} */}
    </div>
  );
}
