import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/common/ProvateRoute";
import PublicRoute from "../components/common/PublicRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AddCategory from "../pages/categories/Add_category";
import AddSubCategory from "../pages/categories/Add_subCategory";
import Categories from "../pages/categories/Categories";
import AddProduct from "../pages/products/Add_product";
import Products from "../pages/products/Products";
import AddUser from "../pages/users/Add_users";
import Users from "../pages/users/Users";

export default function Content() {
    return (
        <Routes>
            <Route path="/*" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="users/new" element={<AddUser />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/new" element={<AddCategory />} />
                <Route path="categories/sub/new" element={<AddSubCategory />} />
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
