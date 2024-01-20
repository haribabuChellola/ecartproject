import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, remove } from "./cartSlice";

function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  return (
    <div>
      {cartItems.map((e) => {
        return (
          <div className="m-2" key={e.id}>
            <h1>{e.title}</h1>
            <h1>{e.count}</h1>
            <button
              className="border-2 border-black p-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
              onClick={() => {
                dispatch(increase(e.id));
              }}
              disabled={e.count === e.stock}
            >
              {e.count === e.stock ? "out of stock" : "increase"}
            </button>
            <button
              className="border-2 border-red-400 p-2 ml-2"
              onClick={() => {
                if (e.count === 1) {
                  dispatch(remove(e.id));
                  return;
                }
                dispatch(decrease(e.id));
              }}
            >
              decrease
            </button>
            <button
              className="border-2 border-green p-2 ml-2"
              onClick={() => dispatch(remove(e.id))}
            >
              remove
            </button>
          </div>
        );
      })}
      {cartItems.length > 0 ? (
        <p>
          {cartItems.reduce((acc, curr) => {
            return acc + curr.count;
          }, 0)}
        </p>
      ) : (
        <h1>no products to show</h1>
      )}
    </div>
  );
}

export default Cart;
