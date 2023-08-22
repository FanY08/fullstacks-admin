import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RouteProtect = (props) => {
    const userId = useSelector((state) => state.global.userId);
    const location = useLocation();

    return userId === "" ? (
        <Navigate
            to="/login"
            replace
            state={{ prevLocation: location.pathname }}
        />
    ) : (
        props.children
    );
};

export default RouteProtect;
