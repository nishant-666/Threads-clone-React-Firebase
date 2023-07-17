import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile";
import Spinner from "../Components/Common/Loader";

export default function ProfilePage() {
  let auth = getAuth();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (!response) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Spinner /> : <Profile />;
}
