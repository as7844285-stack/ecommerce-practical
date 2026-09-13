import { memo, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { axiosInstance } from "../axios";
import { dummyImg, imgBaseURL } from "../staticData";
import { useNavigate } from "react-router-dom";

const Card = ({ product, toggleWishlist, favData = [] }) => {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const isFav = favData.some((item) => item && item._id === product?._id);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      const payload = { productId, quantity: 1 };
      await axiosInstance.post("/cart", payload);
      alert("Added to cart successfully!");
    } catch (error) {
      if (error?.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(error?.response?.data?.message || "Failed to add to cart");
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card">
      <div>
        <img
          src={product?.image ? `${imgBaseURL}${product.image}` : dummyImg}
          alt={product.name}
        />
        <p>{product.name}</p>
        <p>{product.description || "description is not found"}</p>
        <p>
          <span>₹{product.price}</span>
        </p>
      </div>
      <div className="card-btn">
        <Heart
          className="heart-icon"
          fill={isFav ? "red" : "none"}
          color={isFav ? "red" : "gray"}
          style={{ cursor: "pointer" }}
          onClick={() => toggleWishlist(product)}
        />
        <ShoppingCart
          className="icon"
          style={{
            cursor: adding ? "not-allowed" : "pointer",
            opacity: adding ? 0.6 : 1,
          }}
          onClick={() => !adding && addToCart(product._id)}
        />
      </div>
    </div>
  );
};

export default memo(Card);
