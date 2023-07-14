import { createContext, useEffect, useState } from "react";
import { fetchData, fetchPosts } from "../API/useFetch";

export const FeedContext = createContext({});

const FeedProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setUsers(fetchData());
    setPosts(fetchPosts());
  }, []);
  return (
    <FeedContext.Provider value={{ users, posts }}>
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
