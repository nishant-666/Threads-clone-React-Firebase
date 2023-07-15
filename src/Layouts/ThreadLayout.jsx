import React from "react";
import ThreadsPage from "../Pages/ThreadPage";
import BottomBar from "../Components/BottomBar";

export default function ThreadLayout() {
  return (
    <div>
      <ThreadsPage />

      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
