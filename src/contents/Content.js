import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/common/ProvateRoute";
import PublicRoute from "../components/common/PublicRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AddUser from "../pages/users/Add_users";
import Users from "../pages/users/Users";

export default function Content() {
    return (
        <Routes>
            <Route path="/*" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="users/new" element={<AddUser />} />
            </Route>

            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
        </Routes>
    );
}
