import React from "react";
import { Navigate } from "react-router-dom";
import { UseContext } from "../../context/context";

export default function PublicRoute({children}) {
    const { isLogin } = UseContext();

    return !isLogin ? children : <Navigate to="/" replace={true} />;
}
