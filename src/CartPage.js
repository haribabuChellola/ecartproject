import React from "react";
import { useSelector } from "react-redux";

function CartPage() {
  const { cartProducts } = useSelector((store) => store.cart);

  return (
    <div>
      <h1>
        {cartProducts.map((e) => {
          return (
            <div>
              <h1>{e.title}</h1>
              <h1>{e.count}</h1>
            </div>
          );
        })}
      </h1>
    </div>
  );
}

export default CartPage;
