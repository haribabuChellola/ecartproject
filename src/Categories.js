import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import Button from "./Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClipLoader from "react-spinners/ClipLoader";

function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://dummyjson.com/products/");
        setProductsData(
          data.products.filter((e) => {
            return e.category === category;
          })
        );
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [category]);

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
      <span onClick={() => navigate(-1)}>
        <Button>
          <KeyboardBackspaceIcon /> Go Back
        </Button>
      </span>
      <div className="flex justify-center ">
        <h1 className="font-bold text-center text-3xl mb-4 uppercase text-cyan-300 border-2 p-2 border-pink-400  mt-4 rounded-lg">
          {category}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2  lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map((e) => {
          return <SingleProduct {...e} />;
        })}
      </div>
    </div>
  );
}

export default Categories;
