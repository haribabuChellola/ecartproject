import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "./productSlice";
import { Link } from "react-router-dom";

function App() {
  const productsData = useSelector((store) => store.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts());
  }, [dispatch]);

  if (productsData.isLoading) {
    return <h1>loading...</h1>;
  }
  const { products } = productsData;

  return (
    <div className="App">
      {products?.map((e) => {
        return <EachProduct {...e} key={e.id} />;
      })}
    </div>
  );
}

export default App;

const EachProduct = ({
  brand,
  price,
  discountPercentage,
  rating,
  title,
  images,
  id,
}) => {
  return (
    <div>
      <Link to={`/productPage/${id}`}>
        <h1>{brand}</h1>
        <p>{price}</p>
        <p>{discountPercentage}</p>
        <img src={images[0]} alt={title} />
        <p>{rating}</p>
        <p>{title}</p>
      </Link>
    </div>
  );
};
