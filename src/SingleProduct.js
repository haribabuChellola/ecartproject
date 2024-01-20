import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "./cartSlice";

function SingleProduct(e) {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={` relative rounded-md border-2  m-2 p-3 pb-6 shadow-md shadow-cyan-500 before:content-[""] before:w-full before:h-0.5  before:absolute before:bg-pink-500  before:top-0 before:left-0 before:scale-0 hover:before:scale-100 transition-colors before:duration-75 before:origin-left after:content-[""] after:w-full after:h-0.5  after:absolute after:bg-pink-500 after:-bottom-[2px] after:left-0 after:scale-0 hover:after:scale-100  after:duration-75 after:delay-[225ms] after:origin-right`}
        id="animation"
      >
        <span className="animation1"></span>
        <span className="animation2"></span>
        <Link to={`/productpage/${e.id}`}>
          <div>
            {e.discountPercentage && (
              <p className="absolute top-1 left-1 w-auto bg-gradient-to-r from-pink-500 rounded-tl-md rounded-br-md p-1">
                {e.discountPercentage * 1}% off
              </p>
            )}

            <div className="w-full h-52 mt-8">
              <img
                src={e.thumbnail}
                alt={e.title}
                className="object-contain h-full mx-auto "
              />
            </div>
            <p className=" font-medium mt-4">
              {parseInt(e.price * 75 * ((100 - e.discountPercentage) / 100))}{" "}
              &#8377;{" "}
              {e.discountPercentage && (
                <span className=" line-through decoration-red-500 decoration-2 border rounded-md border-black ml-3 p-1 px-2 bg-gradient-to-l from-slate-400">
                  {parseInt(e.price * 75)} &#8377;
                </span>
              )}
            </p>
            <p className="my-4 font-semibold tracking-wide uppercase text-pink-500 ">
              {e.title}
            </p>
          </div>
        </Link>
        {cartItems.findIndex((ele) => {
          return e.id === ele.id;
        }) === -1 ? (
          <button
            onClick={() => dispatch(addToCart({ ...e, count: 1 }))}
            className="text-center bg-gradient-to-r from-cyan-500 mx-auto block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2"
          >
            add to cart
          </button>
        ) : (
          <button
            onClick={() => navigate("/cart")}
            className="text-center bg-gradient-to-r from-pink-300 mx-auto block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2"
          >
            view cart
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleProduct;
