import { memo, useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes, Navigate } from "react-router-dom";
import Wishlist from "./pages/wishlist";
import Home from "./pages/home";
import Form from "./pages/form";
import { axiosInstance } from "./axios";
import Product from "./pages/product";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Cart from "./pages/cart";
import OrderSuccess from "./pages/order-success";
import Admin from "./pages/admin";
import Checkout from "./pages/checkout";

// TODO: replace this with your real auth source (context/localStorage/etc.)
const useAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return { isAuthenticated: !!token, isAdmin: user?.role === "admin" };
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [favData, setFavData] = useState([]);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await axiosInstance.get("/products");
        setProducts(products?.data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get("/wishlist");
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
        const res = await axiosInstance.delete("/wishlist", {
          data: { productId: product._id },
        });
        if (res?.data?.success) {
          setFavData((prev) => prev.filter((item) => item._id !== product._id));
        }
      } else {
        const res = await axiosInstance.post("/wishlist", {
          productId: product._id,
        });
        if (res?.data?.success) {
          setFavData((prev) => [...prev, product]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearWishList = () => {
    setFavData([]);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="app-loading">Loading...</div>
        <Footer />
      </>
    );
  }

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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
};

export default memo(App);
