import React from "react";
import ThreadsPage from "../Pages/ThreadPage";
import BottomBar from "../Components/BottomBar";
import { logout } from "../API/Auth";

export default function ThreadLayout() {
  return (
    <div>
      <button className="logout-btn" onClick={() => logout()}>
        Log Out
      </button>
      <ThreadsPage />

      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
