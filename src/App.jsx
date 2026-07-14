import { memo, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./pages/wishlist";
import Home from "./pages/home";
import { products } from "./components/dummy";
import Product from "./pages/product";
import Form from "./pages/form";

const App = () => {
  const data = products;

  const [favData, setFavData] = useState([]);

  const addToCart = (product) => {
    setFavData((prev) => [...prev, product]);

    
  };

  // Don't put this inside addToCart
  const toggleWishlist = (product) => {
    const exist = favData.find((item) => item.id === product.id);

    if (exist) {
      setFavData(favData.filter((item) => item.id !== product.id));
    } else {
      setFavData([...favData, product]);
    }
    const getFavData = JSON.parse(localStorage.getItem("products")) || [];

    getFavData.push(product);

    localStorage.setItem("products", JSON.stringify(getFavData));
  };



  //clear wishlist
  const clearWishList = () => {

    console.log("clearWishlist clicked");
    setFavData([]);
    localStorage.removeItem("products")
  };

  //local storage
  

  return (
    <>
      <Header />

      <Routes>
        <Route path="/"
        element={
          // <h1
          <Home
              data={data}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />
          
          // />
        }/>
        <Route path="/form"
        element={
        <Form
        
        data={data}/>
        }/>
        <Route
          path="/"
          element={
            <Home
              data={data}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />
          }
        />
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="/product"
          element={<Product data={data} addToCart={addToCart} />}
        />
        <Route
          path="/wishlists"
          element={<Wishlist favData={favData} clearWishList={clearWishList} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default memo(App);
