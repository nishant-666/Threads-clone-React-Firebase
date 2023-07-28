import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchThread from "../Hooks/useFetchThread";
import { formatTime } from "../Helpers/formatTime";
import { BiArrowBack } from "react-icons/bi";
import { getUserByEmail } from "../API/Firestore";
import Spinner from "./Common/Loader";

export default function ThreadDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  let threadID = location?.state?.threadID;
  let { singleThread, isLoading } = useFetchThread(threadID);
  const [currentProfile, setCurrentProfile] = useState([]);

  useEffect(() => {
    getUserByEmail(singleThread?.email, setCurrentProfile);
  }, [singleThread?.email]);

  let { name, profileImage } = currentProfile[0] ?? [];
  if (isLoading) return <Spinner />;
  else {
    // if (!singleThread?.threadData.length)
    //   return <h1>Not Supposed to be Here!</h1>;
    return currentProfile.length ? (
      <div className="thread-details">
        <div className="thread-header">
          <BiArrowBack
            className="react-icon"
            size={30}
            onClick={() => navigate(-1)}
          />
          <p>Thread</p>
        </div>
        <div className="thread-card">
          <div className="description">
            {singleThread?.threadData?.map((thread) => (
              <div className="flex JC-SB" key={thread.id}>
                <img className="thread-user-image" src={profileImage} />
                <div>
                  <p className="name">{name}</p>
                  <p className="timestamp">{formatTime(thread.timestamp)}</p>
                  <p key={thread.id}>{thread}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
}
