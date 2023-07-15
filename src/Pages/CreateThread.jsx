import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { createThread } from "../API/Firestore";

export default function CreateThread() {
  let userName = localStorage.getItem("username");
  let userEmail = localStorage.getItem("userEmail");
  const [threadData, setThreadData] = useState("");
  let navigate = useNavigate();

  const getThreadData = (value) => {
    setThreadData(value);
  };

  const postThread = async () => {
    let payload = {
      name: userName,
      email: userEmail,
      threadData: threadData,
    };

    await createThread(payload);
    navigate("/threads");
  };

  return (
    <div className="create-thread-container">
      <div className="create-thread">
        <AiOutlineClose
          size={25}
          className="react-icon"
          onClick={() => navigate("/threads")}
        />

        <p>New Thread</p>
      </div>

      <p className="current-user">{userName}</p>

      <textarea
        placeholder="Start a Thread.."
        className="thread-body"
        rows={5}
        cols={50}
        onChange={(event) => getThreadData(event.target.value)}
      ></textarea>

      <div className="post-btn-container">
        <button
          onClick={postThread}
          className={`${
            threadData.length === 0 ? "disabled" : ""
          } post-thread `}
          disabled={threadData.length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
}
