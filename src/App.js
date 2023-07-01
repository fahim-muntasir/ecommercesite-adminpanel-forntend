import React from "react";
import { BrowserRouter } from "react-router-dom";
import Content from "./contents/Content";

export default function App() {
    return (
        <BrowserRouter>
            <Content />
        </BrowserRouter>
    );
}
