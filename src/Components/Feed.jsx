import React, { useEffect } from "react";
import { useContext } from "react";
import { FeedContext } from "../Contexts/FeedContext";

export default function Feed() {
  let { users } = useContext(FeedContext);
  const getData = async () => {
    console.log(await users);
  };

  useEffect(() => {
    getData();
  }, [users]);

  return (
    <div className="feed-main">
      <h1>Feed</h1>
    </div>
  );
}
