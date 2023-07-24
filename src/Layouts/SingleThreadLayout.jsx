import React from "react";
import BottomBar from "../Components/BottomBar";
import { logout } from "../API/Auth";
import ThreadDetailsPage from "../Pages/ThreadDetailsPage";

export default function SingleThreadLayout() {
  return (
    <div>
      <button className="logout-btn" onClick={() => logout()}>
        Log Out
      </button>

      <ThreadDetailsPage />

      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
