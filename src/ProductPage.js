import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ProductPage() {
  const { products } = useSelector((store) => store.product);
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((e) => {
    return e.id === Number(id);
  });
  console.log(product);

  return (
    <div>
      <button onClick={() => navigate("/")}>go back</button>
      <h1>{product.title}</h1>
      <h1>{product.category}</h1>
      <h1>{product.description}</h1>
      <h2>{product.price}</h2>
      <h2>{product.rating}</h2>
      <h2>{product.stock}</h2>
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.brand}</h2>
    </div>
  );
}

export default ProductPage;
