import React from "react";
import Layout from "../components/Layout";
import { UseContext } from "../context/context";

export default function Dashboard() {
    const { isLogin } = UseContext();
    console.log(isLogin);
    return <Layout>Dashboard</Layout>;
}
