import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartSlice";
import Button from "./Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClipLoader from "react-spinners/ClipLoader";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cyan } from "@mui/material/colors";
import { toast } from "react-toastify";

function ProductPage() {
  const [element, setElement] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const length = element?.images.length;
  console.log(length);

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
    return (
      <div className="w-full flex justify-center h-[60vh] items-center">
        <ClipLoader
          color={"cyan"}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div>
      <span onClick={() => navigate(-1)} className="block mb-4">
        <Button>
          <KeyboardBackspaceIcon /> Go Back
        </Button>
      </span>
      <div className="relative">
        <div className="flex flex-col md:flex-row md:justify-start">
          {element?.discountPercentage && (
            <p className="absolute top-1 left-1 w-auto bg-gradient-to-r from-pink-500 rounded-tl-md rounded-br-md p-1">
              {element?.discountPercentage}% off
            </p>
          )}
          <div className="w-full h-72 md:h-80 lg:h-96 md:w-1/2 md:border-r-2 md:border-pink-500 mt-6 relative">
            <img
              src={element?.images[imgIndex]}
              alt={element?.title}
              className="object-contain h-full p-6 mx-auto"
            />
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer"
              disabled={imgIndex === length - 1 ? true : false}
            >
              {!(imgIndex === length - 1) && (
                <ArrowForwardOutlined
                  sx={{ fontSize: "40px", color: cyan[400] }}
                  onClick={() => {
                    setImgIndex((prev) => prev + 1);
                  }}
                />
              )}
            </button>
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 hover:cursor-pointer"
              onClick={() => setImgIndex((prev) => prev - 1)}
              disabled={imgIndex === 0 ? true : false}
            >
              {imgIndex !== 0 && (
                <ArrowBackIcon sx={{ fontSize: "40px", color: cyan[400] }} />
              )}
            </button>
          </div>

          <div className="flex flex-col  md:justify-center md:ml-6 md:space-y-6 space-y-4 ">
            <p className="text-3xl md:text-4xl md:font-bold uppercase">
              {element?.title}
            </p>
            <p className=" font-medium mt-4">
              {parseInt(
                element?.price *
                  75 *
                  ((100 - element?.discountPercentage) / 100)
              )}{" "}
              &#8377;{" "}
              {element?.discountPercentage && (
                <span className=" line-through decoration-red-500 decoration-2 border rounded-md border-black ml-3 p-1 px-2 bg-gradient-to-l from-slate-400">
                  {parseInt(element?.price * 75)} &#8377;
                </span>
              )}
            </p>

            {cartItems.findIndex((ele) => {
              return element?.id === ele.id;
            }) === -1 ? (
              <button
                onClick={() => {
                  toast.success(`${element.title} added to cart`);
                  dispatch(addToCart({ ...element, count: 1 }));
                }}
                className=" bg-gradient-to-r from-cyan-500 block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2 mb-4"
              >
                add to cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="bg-gradient-to-r from-pink-300  block max-w-[150px]  p-2 uppercase mt-4 hover:cursor-pointer shadow-btn border-black border-2 mb-4"
              >
                view cart
              </button>
            )}
            <p className="hidden  md:block">{element?.description}</p>

            <p className="">
              <span className="bg-cyan-300 p-1 px-2  uppercase rounded-lg">
                category
              </span>{" "}
              :{"   "}
              {element?.category}
            </p>
            <p>
              <span className="bg-cyan-300 p-1 px-2  uppercase rounded-lg">
                Rating
              </span>{" "}
              :{"   "}
              {element?.rating}
            </p>
            <p>
              <span className="bg-cyan-300 p-1 px-2  uppercase rounded-lg">
                brand
              </span>{" "}
              :{"   "}
              {element?.brand}
            </p>
          </div>
        </div>
        <hr className="mt-4" />
        <h1 className="uppercase text-2xl my-6">details</h1>
        <p className="my-6">{element?.description}</p>
        <hr />
        <h1 className="uppercase text-2xl my-6">Related Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2  lg:grid-cols-3 xl:grid-cols-3">
          {productsData.map((e) => {
            return <SingleProduct {...e} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
