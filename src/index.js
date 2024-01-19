import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./productSlice";
import { Provider } from "react-redux";
import store from "./Store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="productpage/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
