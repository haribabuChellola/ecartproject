import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, decrease, increase, remove } from "./cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { red } from "@mui/material/colors";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      {cartItems.map((e) => {
        return (
          <div
            className="m-2 my-6 outline-2 outline-offset-2 outline-dashed outline-cyan-300 rounded-sm p-4"
            key={e.id}
          >
            <div className="flex justify-between">
              <div className="w-40 h-20">
                <img src={e.thumbnail} alt={e.title} className=" max-h-20" />
              </div>
              <div className="flex flex-col justify-between items-end">
                <h1 className="uppercase font-semibold bg-gradient-to-l from-gray-200">
                  {e.title}
                </h1>
                <span
                  className="hover:border-2 hover:border-red-400  hover:rounded-full  hover:cursor-pointer"
                  onClick={() => {
                    toast.error(`${e.title} removed from cart`);
                    dispatch(remove(e.id));
                  }}
                  title="Remove Item"
                >
                  <CloseIcon sx={{ color: red[400], fontSize: "40px" }} />
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <span className="font-bold text-pink-400 tracking-wider">
                  {" "}
                  Available Stock : {e.stock}
                </span>
                <span className="font-bold text-cyan-500 tracking-wider">
                  Price:{" "}
                  {parseInt(
                    e.price *
                      e.count *
                      75 *
                      ((100 - e.discountPercentage) / 100)
                  )}{" "}
                  &#8377;
                </span>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button
                  className="border-2  p-2 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full hover:bg-green-300 hover:border-black border-green-400"
                  onClick={() => {
                    dispatch(increase(e.id));
                  }}
                  disabled={e.count === e.stock}
                >
                  {e.count === e.stock ? "out of stock" : <AddIcon />}
                </button>
                <span
                  className={`inline-block w-5 h-5 text-center font-bold pl-4 text-xl mb-3 `}
                  style={
                    e.count < 10
                      ? { marginRight: "13px" }
                      : { marginRight: "25px" }
                  }
                >
                  {e.count}
                </span>
                <button
                  className="border-2 border-red-400 p-2 ml-2 rounded-full hover:bg-red-300 hover:border-black"
                  onClick={() => {
                    if (e.count === 1) {
                      toast.error(`${e.title} removed from cart`);
                      dispatch(remove(e.id));
                      return;
                    }
                    dispatch(decrease(e.id));
                  }}
                >
                  <RemoveIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between items-center mt-8">
        {cartItems.length > 0 && (
          <div
            onClick={() => {
              dispatch(clear());
            }}
          >
            <Button data="Clear Cart">
              <DeleteIcon />
            </Button>
          </div>
        )}
        {cartItems.length > 0 ? (
          <p className="text-cyan-600 font-bold tracking-widest ">
            TOTAL :{" "}
            {cartItems.reduce((acc, curr) => {
              return parseInt(
                acc +
                  curr.count *
                    curr.price *
                    75 *
                    ((100 - curr.discountPercentage) / 100)
              );
            }, 0)}{" "}
            &#8377;
          </p>
        ) : (
          <div className="flex flex-col space-y-3 justify-center w-full h-[60vh] items-center">
            <h1
              className={`font-semibold text-cyan-500 after:content-[""] after:w-6 after:animate-bounce after:rounded-full after:h-full after:bg-pink-400 after:absolute relative`}
            >
              Please Add Items to Show Cart Items....
            </h1>
            <div onClick={() => navigate("/")}>
              <Button data="Go Home">
                <HomeIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8">
        {cartItems.length > 0 && (
          <button
            className="uppercase border-2 bg-green-400 hover:bg-green-200 hover:cursor-pointer p-4 hover:border hover:border-black font-semibold"
            onClick={() => {
              toast.success("Order Has Been Placed");
              dispatch(clear());
            }}
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
