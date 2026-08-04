import { memo, useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./pages/wishlist";
import Home from "./pages/home";
import Form from "./pages/form";
import { axiosInstance } from "./axios";
import Product from "./pages/product";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Cart from "./pages/cart";

const App = () => {
  const [favData, setFavData] = useState([]);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axiosInstance.get("/products");
        setProducts(products?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Don't put this inside addToCart
  const toggleWishlist = (product) => {
    const exist = favData.find((item) => item.id === product.id);

    if (exist) {
      setFavData(favData.filter((item) => item.id !== product.id));
    } else {
      setFavData([...favData, product]);
    }
  };

  //clear wishlist
  const clearWishList = () => {
    console.log("clearWishlist clicked");
    setFavData([]);
  };

  //local storage

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            // <h1
            <Home
              products={product}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />

            // />
          }
        />
        <Route path="/form" element={<Form data={product} />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product data={product} />} />
        <Route
          path="/wishlists"
          element={<Wishlist favData={favData} clearWishList={clearWishList} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
};

export default memo(App);
