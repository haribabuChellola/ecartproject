import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import Navbar from "./Navbar";
import Categories from "./Categories";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-[90%] mx-auto md:max-w-screen-sm lg:max-w-screen-md  xl:max-w-screen-lg 2xl:max-w-screen-xl mt-24 mb-[68px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="productpage/:id" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="categories/:category" element={<Categories />} />
        </Routes>
      </div>
      <footer className="h-[66px] flex flex-col md:flex-row items-center bg-cyan-400 justify-between p-2 fixed bottom-0 w-full z-[10] md:h-14 md:px-4 lg:px-16 xl:px-24 ">
        <h1 className="bg-cyan-400 text-center  tracking-wider capitalize">
          Copyright &copy; 2024. All rights are reserved
        </h1>
        <h1>
          Designed and Developed by C Hari Babu{" "}
          <a
            href="https://github.com/haribabuChellola/ecartproject"
            className="ml-4"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </h1>
      </footer>
    </BrowserRouter>
  );
}

export default App;
