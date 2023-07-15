import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import FirestoreProvider from "./Contexts/FirestoreContext";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirestoreProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </FirestoreProvider>
  </React.StrictMode>
);
