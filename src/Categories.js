import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import Button from "./Button";

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
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <span onClick={() => navigate(-1)}>
        <Button data={"Go Back"} />
      </span>
      <div className="flex justify-center ">
        <h1 className="font-bold text-center text-3xl mb-4 uppercase text-cyan-300 border-2 p-2 border-pink-400  mt-4 rounded-lg">
          {category}
        </h1>
      </div>
      <div>
        {productsData.map((e) => {
          return <SingleProduct {...e} />;
        })}
      </div>
    </div>
  );
}

export default Categories;
