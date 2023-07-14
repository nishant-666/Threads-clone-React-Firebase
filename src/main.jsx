import React from "react";
import ReactDOM from "react-dom/client";
import FeedLayout from "./Layouts/FeedLayout";
import FeedProvider from "./Contexts/FeedContext";
import ProfileLayout from "./Layouts/ProfileLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FeedProvider>
      <RouterProvider router={router} />
    </FeedProvider>
  </React.StrictMode>
);
