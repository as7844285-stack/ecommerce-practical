import { memo, useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { axiosInstance } from "../axios";
import { dummyImg, imgBaseURL } from "../staticData";
import { useNavigate } from "react-router-dom";

const Card = ({ product, toggleWishlist, favData = [] }) => {
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(() => {
    if (!product?.image) return dummyImg;
    if (product.image.startsWith("http://") || product.image.startsWith("https://")) {
      return product.image;
    }
    const cleanPath = product.image.replace(/\\/g, "/");
    return `${imgBaseURL}${cleanPath}`;
  });

  const isFav = favData.some((item) => item && item._id === product?._id);

  // Determine an art category pill
  const getCategoryBadge = () => {
    const text = `${product?.name || ""} ${product?.description || ""}`.toLowerCase();
    if (text.includes("watercolor") || text.includes("sakura")) return "Watercolor";
    if (text.includes("abstract") || text.includes("geometry")) return "Abstract";
    if (text.includes("landscape") || text.includes("sunset") || text.includes("horizon")) return "Landscape";
    if (text.includes("portrait") || text.includes("solitude") || text.includes("reverie")) return "Portraiture";
    return "Original Oil";
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (window.confirm("Please log in to add items to your cart. Proceed to login?")) {
        navigate("/login");
      }
      return;
    }

    try {
      setAdding(true);
      const payload = { productId, quantity: 1 };
      await axiosInstance.post("/cart", payload);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2200);
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
    <div className="art-card">
      <div className="art-card-media">
        <img
          src={imgSrc}
          alt={product?.name || "Artwork"}
          className="art-card-img"
          onError={() => setImgSrc(dummyImg)}
          loading="lazy"
        />
        <div className="art-badge">{getCategoryBadge()}</div>
        
        <button
          className={`art-wishlist-btn ${isFav ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          title={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            fill={isFav ? "#e11d48" : "none"}
            color={isFav ? "#e11d48" : "#64748b"}
          />
        </button>

        {justAdded && (
          <div className="art-toast-pill">
            <Check size={14} /> Added to Cart
          </div>
        )}
      </div>

      <div className="art-card-details">
        <h3 className="art-card-title">{product?.name || "Untitled Artwork"}</h3>
        <p className="art-card-desc">
          {product?.description || "Authentic original painting crafted on archival linen canvas."}
        </p>

        <div className="art-card-footer">
          <div className="art-price-wrapper">
            <span className="art-price-label">Price</span>
            <span className="art-price">₹{Number(product?.price || 0).toLocaleString()}</span>
          </div>

          <button
            className={`art-add-cart-btn ${justAdded ? "btn-success" : ""}`}
            disabled={adding}
            onClick={() => addToCart(product?._id)}
            title="Add to Collection Cart"
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>{adding ? "Adding..." : "Add to Cart"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);

