import { CircleX } from "lucide-react";
import { imgBaseURL, dummyImg } from "../staticData";

export default function Wishlist({ favData, toggleWishlist, clearWishList }) {
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

        {favData.length > 0 && (
          <button className="clearBtn" onClick={clearWishList}>
            Clear All <CircleX />
          </button>
        )}
      </div>

      <div className="container">
        {favData.map((product) => (
          <WishListCard
            key={product._id}
            product={product}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}

export const WishListCard = ({ product, toggleWishlist }) => {
  return (
    <div className="card">
      <img
        src={product?.image ? `${imgBaseURL}${product.image}` : dummyImg}
        alt={product.name}
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
