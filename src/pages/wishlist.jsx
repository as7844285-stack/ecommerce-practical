import { CircleX } from "lucide-react";
import { imgBaseURL, dummyImg } from "../staticData";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ favData, toggleWishlist, clearWishList }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const safeFavData = Array.isArray(favData) ? favData.filter(Boolean) : [];

  return (
    <div className="wishlist">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h2>My Wishlist</h2>
        {safeFavData.length > 0 && (
          <button className="clearBtn" onClick={clearWishList}>
            Clear All <CircleX />
          </button>
        )}
      </div>

      <div className="container">
        {!token ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "3rem 1rem",
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                color: "#777",
                marginBottom: "1.5rem",
              }}
            >
              Please log in to view your wishlist.
            </p>
            <button className="btn" onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        ) : safeFavData.length === 0 ? (
          <p
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "1rem",
              fontSize: "1.2rem",
              color: "#777",
              fontWeight: "bolder",
            }}
          >
            Your wishlist is empty.
          </p>
        ) : (
          safeFavData.map((product) => (
            <WishListCard
              key={product._id}
              product={product}
              toggleWishlist={toggleWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
}

export const WishListCard = ({ product, toggleWishlist }) => {
  return (
    <div className="card">
      <img
        src={product?.image ? `${imgBaseURL}${product.image}` : dummyImg}
        alt={product?.name || "Product"}
      />

      <p>
        <b>{product.name}</b>
      </p>

      <p>{product.description || "description is not found"}</p>

      <p>
        ₹<span>{product.price}</span>
      </p>

      <button onClick={() => toggleWishlist(product)}>Remove</button>
    </div>
  );
};
