import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ThreadLayout from "../Layouts/ThreadLayout";
import ProfileLayout from "../Layouts/ProfileLayout";
import CreateThreadLayout from "../Layouts/CreateThreadLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/threads",
    element: <ThreadLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/create-thread",
    element: <CreateThreadLayout />,
  },
]);
