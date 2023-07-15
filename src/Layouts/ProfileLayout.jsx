import React from "react";
import ProfilePage from "../Pages/ProfilePage";
import BottomBar from "../Components/BottomBar";

export default function ProfileLayout() {
  return (
    <div>
      <ProfilePage />
      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
