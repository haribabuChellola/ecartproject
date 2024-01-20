import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import { pink } from "@mui/material/colors";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <nav className="flex justify-between items-center fixed w-[100%] left-0 top-0 pt-2  border-b-2 pl-2 pr-2 pb-2 shadow-sm shadow-pink-500 z-50 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20 xl:pl-32 xl:pr-32 bg-white">
      <div className="flex space-x-4 items-center">
        <div>
          <img src="./home-icon.png" alt="home-icon" className="w-16" />
        </div>
        <div onClick={() => navigate("/")}>
          <SearchIcon
            sx={{ color: pink[500], fontSize: 50 }}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
      <div>
        <div className="flex space-x-4">
          <div onClick={() => navigate("./cart")} className="relative">
            <ShoppingCartOutlinedIcon
              sx={{ color: pink[500], fontSize: 40 }}
              className="hover:cursor-pointer"
            />
            {cartItems.length > 0 && (
              <span className="absolute rounded-full bg-cyan-300 top-0 right-0 w-4 h-4 text-xs text-center font-bold">
                {cartItems.reduce((acc, curr) => {
                  return acc + curr.count;
                }, 0)}
              </span>
            )}
          </div>
          <div>
            <Person2OutlinedIcon
              sx={{ color: pink[500], fontSize: 40 }}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
