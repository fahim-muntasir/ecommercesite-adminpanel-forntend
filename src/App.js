import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Content from "./contents/Content";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Content />
      </Layout>
    </BrowserRouter>
  );
}
