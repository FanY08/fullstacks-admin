import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteProtect = (props) => {
    const userId = useSelector((state) => state.global.userId);

    return userId === "" ? <Navigate to="/login" replace /> : props.children;
};

export default RouteProtect;
