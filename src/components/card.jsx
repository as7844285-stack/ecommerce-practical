import { memo } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { axiosInstance } from "../axios";

const Card = (prop) => {
  const isFav = (prop.favData || []).some((item) => item.id === prop.id);

  const addToCart = async (product) => {
    try {
      console.log("add to cart clicked", product);

      await axiosInstance.post("/cart", { productId: product });
      alert("Product added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card">
      <div key={prop.id}>
        <img src={prop.image} alt="" />
        <p> {prop.title}</p>

        <p>{prop.discription}</p>
        <p>
          <span>{prop.price}</span>
        </p>
      </div>
      <div className="card-btn">
        <Heart
          className="heart-icon"
          fill={isFav ? "red" : "none"}
          color={isFav ? "red" : "gray"}
          onClick={() => prop.toggleWishlist(prop)}
        />
        <ShoppingCart
          className="icon"
          onClick={() => {
            console.log("add to cart clicked");
            addToCart(prop.id);
          }}
        />
      </div>{" "}
    </div>
  );
};

export default memo(Card);
