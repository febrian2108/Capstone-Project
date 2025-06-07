import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPages from "../pages/LoginPages";
import HomePages from "../pages/HomePages";
import RegisterPages from "../pages/RegisterPages";
import QuestionPages from "../pages/QuestionPages";
import ProfilePages from "../pages/ProfilePages";
import AboutApps from "../pages/AboutAppsPages";
import OutputPages from "../pages/OutputPages";
import PasswordPages from "../pages/PasswordPages";

const router = createBrowserRouter([
    { 
        path: '/', 
        element: React.createElement(HomePages)
    },
    {
        path: '/register',
        element: React.createElement(RegisterPages)
    },
    {
        path: '/login',
        element: React.createElement(LoginPages)
    },
    {
        path: '/about',
        element: React.createElement(AboutApps)
    },
    {
        path: '/question',
        element: React.createElement(QuestionPages)
    },
    {
        path: '/profile',
        element: React.createElement(ProfilePages)
    },
    {
        path: '/password',
        element: React.createElement(PasswordPages)
    },
    {
        path: '/output',
        element: React.createElement(OutputPages)
    },
])

export default router;