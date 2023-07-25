import React, { useContext, useEffect, useState } from "react";
import ActionBtns from "./ActionBtns";
import { formatTime } from "../Helpers/formatTime";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import { useNavigate } from "react-router-dom";
import { getUserByID } from "../API/Firestore";

export default function SingleThread({ thread }) {
  let navigate = useNavigate();
  let { currentUser } = useContext(FirestoreContext);
  let currentUserID = currentUser[0]?.id;
  let currentUserName = currentUser[0]?.name;
  const [currentProfile, setProfile] = useState({});
  const openThread = () => {
    navigate("/thread-details", {
      state: {
        threadID: thread?.id,
      },
    });
  };

  const fetchSingleUser = async () => {
    try {
      await getUserByID(thread?.currentUserID, setProfile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [thread?.currentUserID]);

  return (
    <>
      <div className="thread-card">
        <img className="thread-user-image" src={currentProfile?.profileImage} />
        <div>
          <div className="flex JC-SB">
            <div>
              <p onClick={openThread} className="name">
                {currentProfile.name}
              </p>
              <p className="timestamp">{formatTime(thread.timestamp)}</p>
            </div>
          </div>
          <div className="description">
            {thread.threadData.map((thread, index) => (
              <p key={index}>{thread}</p>
            ))}
          </div>

          <div className="action-btns">
            <ActionBtns
              userId={currentUserID}
              recipientUserId={thread?.currentUserID}
              threadData={thread?.threadData}
              threadID={thread.id}
              currentUserName={currentUserName}
            />
          </div>
        </div>
      </div>
    </>
  );
}
