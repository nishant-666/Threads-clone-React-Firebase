import React from "react";
import Notifications from "../Pages/Notifications";
import BottomBar from "../Components/BottomBar";
import { logout } from "../API/Auth";

export default function NotificationLayout() {
  return (
    <div>
      <button className="logout-btn" onClick={() => logout()}>
        Log Out
      </button>
      <Notifications />

      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
