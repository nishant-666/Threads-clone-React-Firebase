import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    <div className="feed-main">
      <h1>Threads</h1>

      <p>Here you will see all the threads..</p>
    </div>
  );
}
