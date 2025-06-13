import React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomePages from "../pages/HomePages";
import LoginPages from "../pages/LoginPages";
import RegisterPages from "../pages/RegisterPages";
import AboutApps from "../pages/AboutApps";
import QuestionPages from "../pages/QuestionPages";
import OutputPages from "../pages/OutputPages";
import ProfilePages from "../pages/ProfilePages";
import PasswordPages from "../pages/PasswordPages";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <HomePages /> },
  { path: "/login", element: <LoginPages /> },
  { path: "/register", element: <RegisterPages /> },
  { path: "/about", element: <AboutApps /> },
  {
    path: "/",                // route wrapper untuk protected routes
    element: <PrivateRoute />,
    children: [
      { path: "question", element: <QuestionPages /> },
      { path: "output", element: <OutputPages /> },
      { path: "profile", element: <ProfilePages /> },
      { path: "password", element: <PasswordPages /> },
    ],
  },
]);

export default router;
