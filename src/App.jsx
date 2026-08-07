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
import OrderSuccess from "./pages/order-success";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [favData, setFavData] = useState([]);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await axiosInstance.get("/products");
        await new Promise((r) => setTimeout(r, 1500));
        setProducts(products?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get("/wishlist");
        console.log("wishlist response:", res?.data);
        setFavData(res?.data?.data || []);
      } catch (error) {
        console.log("wishlist fetch error:", error);
      }
    };

    fetchData();
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const exist = favData.some((item) => item._id === product._id);

    try {
      if (exist) {
        await axiosInstance.delete("/wishlist", {
          data: { productId: product._id },
        });
        setFavData((prev) => prev.filter((item) => item._id !== product._id));
      } else {
        await axiosInstance.post("/wishlist", { productId: product._id });
        setFavData((prev) => [...prev, product]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearWishList = () => {
    setFavData([]);
  };
  console.log("App loading:", loading);
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={product}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />
          }
        />
        <Route path="/form" element={<Form data={product} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/product" element={<Product data={product} />} /> */}
        <Route
          path="/product"
          element={
            <Product
              products={product}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />
          }
        />

        <Route
          path="/wishlists"
          element={
            <Wishlist
              favData={favData}
              toggleWishlist={toggleWishlist}
              clearWishList={clearWishList}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <Footer />
    </>
  );
};

export default memo(App);
