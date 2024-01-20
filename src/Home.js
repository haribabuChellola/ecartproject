import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useSearchParams } from "react-router-dom";
import HowItWorksDetails from "./HowItWorksDetails";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import SingleProduct from "./SingleProduct";
import Button from "./Button";
import Category from "./Category";
import { cyan, pink } from "@mui/material/colors";

function Home() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputData, setInputData] = useState("");
  const refContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://dummyjson.com/products/");
        setProductsData(data.products);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    refContainer?.current?.focus();
  });
  const handleChange = (e) => {
    if (!e.target.value) {
      setSearchParams({});
    } else {
      setSearchParams({ search: e.target.value });
    }

    setInputData(e.target.value);
  };

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
      <input
        type="search"
        onChange={handleChange}
        value={inputData}
        className="border-2 border-cyan-400 placeholder-shown:p-2 focus:p-2 outline-0 focus:outline-dashed mb-4 w-full"
        placeholder="Type here to search..."
        ref={refContainer}
      />

      {!searchParams.get("search") && (
        <div>
          <div
            className="flex space-y-12 flex-col bg-cover p-8 relative md:space-y-16 lg:space-y-20 bg-center rounded-lg overflow-hidden "
            id="background-image"
            aria-label="hero"
          >
            <p
              className="absolute w-full h-full bg-gradient-to-r  from-slate-700 top-0 left-0 "
              aria-label="overlay"
            ></p>
            <h1 className="font-bold text-2xl max-w-sm md:max-w-md lg:max-w-7xl text-white z-10 ">
              Stay Home, & Get Your Daily Need's
            </h1>
            <p className="text-white z-10">
              Start your daily shopping with E Cart.
            </p>

            <Button data="Order Now" maxWidth="200px">
              <ArrowForwardOutlinedIcon goto="#products" />
            </Button>
          </div>

          <h1 className="mt-8 text-2xl uppercase pl-2">Shop by Category</h1>
          <div aria-label="categories" className="mt-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-2">
              <Category
                categoryName="smartphones"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2017/04/03/15/52/mobile-phone-2198770_1280.png"
                }
              />
              <Category
                categoryName="laptops"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2016/08/17/04/43/template-1599667_1280.png"
                }
              />
              <Category
                categoryName="groceries"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2021/05/27/18/55/woman-6289052_1280.png"
                }
              />
              <Category
                categoryName="skincare"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2018/08/12/11/27/skincare-3600570_1280.png"
                }
              />
              <Category
                categoryName="home-decoration"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2023/04/20/06/31/living-room-7939062_1280.png"
                }
              />
              <Category
                categoryName="fragrances"
                imgsrc={
                  "https://cdn.pixabay.com/photo/2014/12/21/23/50/perfume-576172_1280.png"
                }
              />
            </div>
          </div>
          <span id="products"></span>
          <h1 className="my-8 text-2xl uppercase pl-2">All Products</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2  lg:grid-cols-3 xl:grid-cols-3">
        {productsData
          .filter((e) => {
            return e.title.toLowerCase().includes(inputData);
          })
          .map((e) => {
            return <SingleProduct {...e} key={e.id} />;
          })}
      </div>
      <h1 className="font-semibold text-xl text-pink-600">
        {productsData.filter((e) => {
          return e.title.toLowerCase().includes(inputData);
        }).length === 0 &&
          "No produts to show..... try searching for other products"}{" "}
      </h1>
      {!searchParams.get("search") && (
        <div>
          <div className="flex flex-col space-y-4 md:flex-row md:flex-wrap md:space-y-0 items-center my-4 mb-8 border border-black p-4 rounded-md">
            <HowItWorksDetails
              heading="Select Your order"
              paragraph="It is a long established fact that a reader will be distracted."
            >
              <ShoppingBagIcon sx={{ fontSize: 40, color: cyan[400] }} />
            </HowItWorksDetails>
            <HowItWorksDetails
              heading="Preparing your cart items"
              paragraph="It is a long established fact that a reader will be distracted."
            >
              <CategoryIcon sx={{ fontSize: 40, color: pink[400] }} />
            </HowItWorksDetails>
            <HowItWorksDetails
              heading="Delivery To Your Home"
              paragraph="It is a long established fact that a reader will be distracted."
            >
              <LocalShippingIcon sx={{ fontSize: 40, color: cyan[400] }} />
            </HowItWorksDetails>
          </div>
          <div
            className="flex space-y-12 flex-col bg-cover p-8 relative md:space-y-16 lg:space-y-20 bg-center rounded-lg overflow-hidden my-8"
            id="background2"
            aria-label="second-hero"
          >
            <p
              className="absolute w-full h-full bg-gradient-to-r  from-slate-700 top-0 left-0 "
              aria-label="overlay"
            ></p>
            <h1 className="font-bold text-2xl max-w-sm md:max-w-md lg:max-w-7xl text-white z-10 ">
              Fast, Free Shipping, Contactless Delivery.
            </h1>
            <p className="text-white z-10">Try it now, risk free!</p>
            <Button data="Shop Now" maxWidth="200px" goto="#products">
              <ArrowForwardOutlinedIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
