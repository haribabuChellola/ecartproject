import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "./productSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { addToCart, increase } from "./CartSlice";

function App() {
  const productsData = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addProducts());
  }, [dispatch]);

  if (productsData.isLoading) {
    return <h1>loading...</h1>;
  }
  const { products } = productsData;

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearchParams({ search: e.target.value });
  };
  console.log(search);

  return (
    <div className="App">
      <input
        type="search"
        className="border-2 border-black"
        onChange={handleChange}
        placeholder="search here"
      />
      <button onClick={() => navigate("/cartpage")}>cart</button>
      {products
        ?.filter((e) => {
          return e.title.toLowerCase().includes(search);
        })
        .map((e) => {
          return <EachProduct {...e} key={e.id} />;
        })}
      {products?.filter((e) => {
        return e.title.toLowerCase().includes(search);
      }).length === 0 && <h1>no products to show</h1>}
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
  thumbnail,
}) => {
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((store) => store.cart);
  const handleClick = () => {
    dispatch(addToCart({ title, id, thumbnail, count: 1 }));
  };

  const index = cartProducts.findIndex((e) => {
    return e.id === id;
  });

  return (
    <div>
      <Link to={`/productPage/${id}`}>
        <h1>{brand}</h1>
        <p>{price}</p>
        <p>{discountPercentage}</p>
        <img src={thumbnail} alt={title} />
        <p>{rating}</p>
        <p>{title}</p>
      </Link>
      <button>increase</button>
      <button
        className="border-2 border-black bg-cyan-400 p-2 capitalize"
        onClick={handleClick}
      >
        {index !== -1 ? cartProducts[index].count : "add to cart"}
      </button>
      <button onClick={() => dispatch(increase(id))}>decrease</button>
    </div>
  );
};
