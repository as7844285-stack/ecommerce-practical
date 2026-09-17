import { memo, useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";

import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";

import Wishlist from "./pages/wishlist";
import Home from "./pages/home";
import Form from "./pages/form";

import { axiosInstance } from "./axios";

import Product from "./pages/product";
import AddProduct from "./pages/add-product";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Cart from "./pages/cart";
import OrderSuccess from "./pages/order-success";
import Admin from "./pages/admin";
import Checkout from "./pages/checkout";

// ================= AUTH =================

const useAuth = () => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
  };
};

// ================= PROTECTED ROUTE =================

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ================= APP =================

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [favData, setFavData] = useState([]);
  const [product, setProducts] = useState([]);

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosInstance.get("/products");

        setProducts(
          Array.isArray(response?.data?.data) ? response.data.data : [],
        );
      } catch (error) {
        console.log("Products fetch error:", error);

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= FETCH WISHLIST =================

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setFavData([]);
        return;
      }

      try {
        const res = await axiosInstance.get("/wishlist");
        setFavData(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
        }
        setFavData([]);
      }
    };

    fetchWishlist();
  }, [location.pathname]);

  // ================= WISHLIST =================

  const toggleWishlist = async (product) => {
    if (!product?._id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your wishlist.");
      navigate("/login");
      return;
    }

    const exist = favData.some((item) => item._id === product._id);

    try {
      if (exist) {
        await axiosInstance.delete("/wishlist", {
          data: { productId: product._id },
        });
        setFavData((prev) => prev.filter((item) => item._id !== product._id));
      } else {
        await axiosInstance.post("/wishlist", {
          productId: product._id,
        });
        setFavData((prev) => [...prev, product]);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error(
          "Wishlist error:",
          error?.response?.status,
          error?.response?.data || error.message,
        );
      }
    }
  };

  // ================= CLEAR WISHLIST =================

  const clearWishList = () => {
    setFavData([]);
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <>
        <Header wishlistCount={favData.length} />

        <div className="app-loading">Loading...</div>

        <Footer />
      </>
    );
  }

  // ================= RETURN =================

  return (
    <>
      <Header wishlistCount={favData.length} />

      <Routes>
        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              products={product}
              toggleWishlist={toggleWishlist}
              favData={favData}
              loading={loading}
            />
          }
        />

        {/* FORM */}

        <Route path="/form" element={<Form data={product} />} />

        {/* SIGNUP */}

        <Route path="/signup" element={<Signup />} />

        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        {/* PRODUCTS */}

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

        {/* WISHLIST */}

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

        {/* CART */}

        <Route path="/cart" element={<Cart />} />

        {/* ORDER SUCCESS */}

        <Route path="/order-success" element={<OrderSuccess />} />

        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route path="/admin" element={<Admin />} />

        {/* ================= ADD PRODUCT ================= */}

        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>

      <Footer />
    </>
  );
};

export default memo(App);
