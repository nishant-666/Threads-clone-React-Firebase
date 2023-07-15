import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SingleThread from "./SingleThread";
import ThreadIcon from "../assets/Threads.png";

export default function Threads() {
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
        <SingleThread />
        <SingleThread />
        <SingleThread />
        <SingleThread />

        <SingleThread />
        <SingleThread />
        <SingleThread />
        <SingleThread />
        <SingleThread />
        <SingleThread />
        <SingleThread />
      </div>
    </div>
  );
}
