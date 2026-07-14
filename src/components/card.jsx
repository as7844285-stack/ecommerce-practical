import { memo } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const Card = (prop) => {
  const isFav = (prop.favData||[]).some((item) => item.id === prop.id);
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
      <div className="card-btn" onClick={() => prop.fevtoggle(prop)}>
        <Heart
          className="heart-icon"
          fill={isFav ? "red" : "none"}
          color={isFav ? "red" : "gray"}
          onClick={() => prop.toggleWishlist(prop)}
        />
        <ShoppingCart className="icon" onClick={() => prop.addToCart(prop)} />
      </div>
   </div>
  );
};

export default memo(Card);
