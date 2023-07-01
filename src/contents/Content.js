import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AddUser from "../pages/users/Add_users";
import Users from "../pages/users/Users";

export default function Content() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/new" element={<AddUser />} />
        </Routes>
    );
}
