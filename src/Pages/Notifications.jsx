import React from "react";
import useFetchNotifications from "../Hooks/useNotifications";
import { useLocation } from "react-router-dom";
import Notifications from "../Components/Notifications";

export default function NotificationsPage() {
  let { notifications } = useFetchNotifications();
  let location = useLocation();
  let isNotifEmpty = location?.state?.isRead;

  if (isNotifEmpty === 0)
    return <h1 className="no-notifications">No Notifications</h1>;
  return (
    <div>
      <ul className="notification-ul">
        {notifications.map((notification) => (
          <div key={notification.id}>
            <Notifications notification={notification} />
          </div>
        ))}
      </ul>
    </div>
  );
}