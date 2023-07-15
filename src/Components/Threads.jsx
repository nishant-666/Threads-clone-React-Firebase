import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import SingleThread from "./SingleThread";
import ThreadIcon from "../assets/Threads.png";

export default function Threads() {
  let { threads } = useContext(FirestoreContext);
  let auth = getAuth();
  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (!response) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="threads-main">
      <div className="thread-icon-container">
        <img src={ThreadIcon} className="thread-icon" />
      </div>
      <div className="single-threads">
        {threads.map((thread) => (
          <SingleThread thread={thread} />
        ))}
      </div>
    </div>
  );
}
