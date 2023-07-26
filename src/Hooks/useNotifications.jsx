import { useEffect, useState, useContext } from "react";
import { FirestoreContext } from "../Contexts/FirestoreContext";
import { getNotifications } from "../API/Firestore";

export default function useFetchNotifications() {
  let { currentUser } = useContext(FirestoreContext);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const fetchNotifications = () => {
    setLoading(true);
    try {
      getNotifications(currentUser[0].id, setNotifications);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [currentUser[0]?.id]);

  return { notifications };
}
