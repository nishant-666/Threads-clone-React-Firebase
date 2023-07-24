import { useEffect, useState } from "react";
import { getSingleThread } from "../API/Firestore";

export default function useFetchThread(threadID) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [singleThread, setSingleThread] = useState();

  const fetchThreads = async () => {
    setLoading(true);
    try {
      getSingleThread(threadID, setSingleThread);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [threadID]);

  return { singleThread, isLoading };
}
