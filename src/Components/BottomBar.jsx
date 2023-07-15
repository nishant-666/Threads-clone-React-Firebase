import React from "react";
import { BiHomeAlt, BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomBar() {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="bottom-container">
      <div className="bottom-bar">
        <BiHomeAlt
          size={40}
          className={`react-icon ${
            location.pathname === "/threads" ? "filled" : ""
          }`}
          onClick={() => navigate("/threads")}
        />
        <BiSearch
          size={40}
          className={`react-icon ${location.pathname === "" ? "filled" : ""}`}
        />
        <FiEdit
          size={40}
          className={`react-icon ${
            location.pathname === "/create-thread" ? "filled" : ""
          }`}
          onClick={() => navigate("/create-thread")}
        />
        <AiOutlineUser
          size={40}
          className={`react-icon ${
            location.pathname === "/profile" ? "filled" : ""
          }`}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
