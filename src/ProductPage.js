import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import Button from "./Button";

function ProductPage() {
  const [element, setElement] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://dummyjson.com/products/");
        setProductsData(
          data.products.filter((e) => {
            return e.category === element.category && e.id !== element.id;
          })
        );
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [element]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://dummyjson.com/products/" + id
        );
        setElement(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <span onClick={() => navigate(-1)} className="mb-8">
        <Button data={"Go Back"} />
      </span>
      <div className="relative">
        <div className="flex flex-col md:flex-row md:justify-start">
          {element?.discountPercentage && (
            <p className="absolute top-1 left-1 w-auto bg-gradient-to-r from-pink-500 rounded-tl-md rounded-br-md p-1">
              {element?.discountPercentage}% off
            </p>
          )}
          <div className="w-full h-72 md:h-80 lg:h-96 md:w-1/2 md:border-r-2 md:border-pink-500">
            <img
              src={element?.thumbnail}
              alt={element?.title}
              className="object-contain h-full p-6"
            />
          </div>

          <div className="flex flex-col  md:justify-center md:ml-6 md:space-y-6 space-y-4 ">
            <p className="text-3xl md:text-4xl md:font-bold">
              {element?.title}
            </p>
            {cartItems.findIndex((ele) => {
              return element?.id === ele.id;
            }) === -1 ? (
              <button
                onClick={() => dispatch(addToCart({ ...element, count: 1 }))}
                className=" bg-gradient-to-r from-cyan-500 block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2"
              >
                add to cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="bg-gradient-to-r from-pink-300  block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2"
              >
                view cart
              </button>
            )}
            <p className="hidden  md:block">{element?.description}</p>

            <p className="">
              <span className="bg-cyan-300 p-1 px-2  capitalize">category</span>{" "}
              :{"   "}
              {element?.category}
            </p>
            <p>
              <span className="bg-cyan-300 p-1 px-2  capitalize">Rating</span> :
              {"   "}
              {element?.rating}
            </p>
            <p>
              <span className="bg-cyan-300 p-1 px-2  capitalize">brand</span> :
              {"   "}
              {element?.brand}
            </p>
            <p>
              <span className="bg-cyan-300 p-1 px-2  capitalize">
                Avalilable Stock
              </span>
              {"  "}:{element?.stock}
            </p>
          </div>
        </div>
        <hr className="mt-4" />
        <h1 className="uppercase text-2xl my-6">details</h1>
        <p className="my-6">{element?.description}</p>
        <hr />
        <h1 className="uppercase text-2xl my-6">Related Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2  lg:grid-cols-3 xl:grid-cols-4">
          {productsData.map((e) => {
            return <SingleProduct {...e} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
