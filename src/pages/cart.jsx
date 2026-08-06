import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../axios";
import { dummyImg, imgBaseURL } from "../staticData";

export default function Cart() {
  const [cartData, setCartData] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartData(res?.data?.data?.products || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeCart = async (productId) => {
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      setCartData((prev) =>
        prev.filter((item) => item.product._id !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      await axiosInstance.put("/cart", { productId, quantity });
      setCartData((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addToCart">
      <div className="cart-header">
        <h2>My Cart</h2>
      </div>

      {cartData.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <div className="boxes">
          {cartData.map((item) => (
            <CartCard
              key={item.product._id}
              item={item}
              onIncrease={() => updateQty(item.product._id, item.quantity + 1)}
              onDecrease={() => updateQty(item.product._id, item.quantity - 1)}
              onRemove={() => removeCart(item.product._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const CartCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { product, quantity } = item;

  return (
    <div className="card">
      <img
        src={product?.image ? `${imgBaseURL}${product.image}` : dummyImg}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <div className="qty-container">
        <button
          className="qty-btn"
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={onIncrease}>
          +
        </button>
        <button className="remove-btn" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};
