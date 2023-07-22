import React, { useState, useEffect } from "react";
import { formatTime } from "../Helpers/formatTime";
import { getUserByID } from "../API/Firestore";
import { readNotifications } from "../API/Firestore";

export default function Notifications({ notification }) {
  const [currentProfile, setCurrentProfile] = useState([]);

  useEffect(() => {
    getUserByID(notification.senderUserEmail, setCurrentProfile);
  }, []);

  let { name, profileImage } = currentProfile[0] ?? [];

  const readNotification = (id) => {
    readNotifications(id);
  };

  return (
    <>
      {!notification?.isRead ? (
        <li
          onClick={() => readNotification(notification.id)}
          className="notification-list"
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
        </li>
      ) : (
        <></>
      )}
    </>
  );
}
