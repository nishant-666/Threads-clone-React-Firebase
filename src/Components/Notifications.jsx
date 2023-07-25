import React, { useState, useEffect } from "react";
import { formatTime } from "../Helpers/formatTime";
import { getUserByEmail } from "../API/Firestore";
import { readNotifications } from "../API/Firestore";
import { useNavigate } from "react-router-dom";

export default function Notifications({ notification }) {
  let navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState([]);

  let { name, profileImage } = currentProfile[0] ?? [];

  const readNotification = (notificationID, threadID) => {
    readNotifications(notificationID);
    navigate("/thread-details", {
      state: {
        threadID,
      },
    });
  };

  useEffect(() => {
    getUserByEmail(notification?.senderUserEmail, setCurrentProfile);
  }, [notification.senderUserEmail]);

  return (
    <>
      <div
        onClick={() =>
          readNotification(notification.id, notification?.threadID)
        }
        className={`notification-list ${!notification?.isRead ? "active" : ""}`}
      >
        <div>
          <img
            className="notification-image"
            loading="lazy"
            src={profileImage}
          />
        </div>

        <div>
          {notification.type === "like" && (
            <p className="username">{name} liked your Thread.</p>
          )}
          {notification.type === "comment" && (
            <p className="username">{name} commented on your Thread.</p>
          )}

          <p className="timestamp">{formatTime(notification.timestamp)}</p>
        </div>
      </div>
    </>
  );
}
