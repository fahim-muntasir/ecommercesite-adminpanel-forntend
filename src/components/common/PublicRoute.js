import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseContext } from "../../context/context";

export default function PublicRoute() {
    const { isLogin } = UseContext();

    return !isLogin ? <Outlet /> : <Navigate to="/" replace={true} />;
}
