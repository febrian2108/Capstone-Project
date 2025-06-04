import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPages from "../pages/LoginPages";
import HomePages from "../pages/HomePages";
import RegisterPages from "../pages/RegisterPages";

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
    }
])

export default router;