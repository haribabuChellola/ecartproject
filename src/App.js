import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Navbar from "./Navbar";
import Categories from "./Categories";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-[90%] mx-auto md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl mt-24 scroll-smooth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="productpage/:id" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="categories/:category" element={<Categories />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
