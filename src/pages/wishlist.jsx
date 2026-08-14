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
// import { memo } from "react";
// import { Heart, ShoppingCart } from "lucide-react";
// import { axiosInstance } from "../axios";
// import { imgBaseURL, dummyImg } from "../staticData";

// const Card = ({ product, toggleWishlist, favData }) => {
//   const isFav = (favData || []).some((item) => item._id === product._id);

//   const addToCart = async (productId) => {
//     try {
//       const payload = { productId, quantity: 1 };
//       const response = await axiosInstance.post("/cart", payload);
//       console.log("response", response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="card">
//       <div>
//         <img
//           src={product?.image ? `${imgBaseURL}${product.image}` : dummyImg}
//           alt={product.name}
//         />
//         <p>{product.name}</p>
//         <p>{product.description || "description is not found"}</p>
//         <p>
//           <span>₹{product.price}</span>
//         </p>
//       </div>
//       <div className="card-btn">
//         <Heart
//           className="heart-icon"
//           fill={isFav ? "red" : "none"}
//           color={isFav ? "red" : "gray"}
//           onClick={() => toggleWishlist(product)}
//         />
//         <ShoppingCart className="icon" onClick={() => addToCart(product._id)} />
//       </div>
//     </div>
//   );
// };

// export default memo(Card);
