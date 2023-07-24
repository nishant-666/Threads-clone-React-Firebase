import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchThread from "../Hooks/useFetchThread";
import { formatTime } from "../Helpers/formatTime";
import { BiArrowBack } from "react-icons/bi";
import { getUserByID } from "../API/Firestore";
import Spinner from "./Common/Loader";

export default function ThreadDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  let threadID = location?.state?.threadID;
  let { singleThread, isLoading } = useFetchThread(threadID);
  const [currentProfile, setCurrentProfile] = useState([]);

  useEffect(() => {
    getUserByID(singleThread?.email, setCurrentProfile);
  }, [singleThread?.email]);

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

        {singleThread?.threadData?.length === 1 ? (
          <div className="thread-card">
            <div className="thread-header">
              <div className="thread-meta">
                {currentProfile[0]?.profileImage ? (
                  <img
                    className="thread-currentimg"
                    src={currentProfile[0]?.profileImage}
                  />
                ) : (
                  <></>
                )}
                <h3>{currentProfile[0]?.name}</h3>
              </div>
            </div>
            <div className="thread-content">
              <p>{singleThread?.threadData}</p>

              <p className="thread-timestamp">
                {formatTime(singleThread?.timestamp)}
              </p>
            </div>
          </div>
        ) : (
          singleThread?.threadData?.map((thread) => (
            <div className="thread-card">
              <div className="thread-header">
                <div className="thread-meta">
                  <img
                    className="thread-currentimg"
                    src={currentProfile[0]?.profileImage}
                  />
                  <h3>{currentProfile[0]?.name}</h3>
                </div>
              </div>
              <div className="thread-content">
                <p className="thread-thread">{thread}</p>

                <p className="thread-timestamp">
                  {formatTime(singleThread?.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    ) : (
      <></>
    );
  }
}
