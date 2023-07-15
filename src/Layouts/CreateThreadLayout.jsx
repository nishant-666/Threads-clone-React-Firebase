import React from "react";
import CreateThread from "../Pages/CreateThread";
import BottomBar from "../Components/BottomBar";

export default function CreateThreadLayout() {
  return (
    <div>
      <CreateThread />
      <div className="bottom-container">
        <BottomBar />
      </div>
    </div>
  );
}
