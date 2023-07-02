import React from "react";
import { BrowserRouter } from "react-router-dom";
import Content from "./contents/Content";
import { UseContext } from "./context/context";
import useCheckAuth from "./hook/useCheckAuth";

export default function App() {
    const authCheck = useCheckAuth();

    const { isLogin } = UseContext();

    console.log(isLogin);

    return !authCheck ? (
        <div>Loading...</div>
    ) : (
        <BrowserRouter>
            <Content />
        </BrowserRouter>
    );
}
