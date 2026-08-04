import { useEffect, useState } from "react";
import { axiosInstance } from "../axios";
import { dummyImg, imgBaseURL } from "../staticData";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  // const [quantity, setQuantity] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await axiosInstance.get("/cart");
        console.log("cartData", cartData);
        setCartData(cartData?.data?.data?.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const removeCart = async (product) => {
    try {
      console.log("productId : ", product);
      const remove = await axiosInstance.delete("/cart", {
        productId: product,
      });
      console.log("remove", remove);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      const respone = await axiosInstance.put("/cart", { productId, quantity });
      console.log(respone.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addToCart">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h2> Add To Cart </h2>
      </div>

      <div className="boxes">
        {cartData.map((elem) => (
          <div key={elem.product._id} className="card">
            <img src={elem?.image ? `${imgBaseURL}${elem?.image}` : dummyImg} />

            <h3 style={{ padding: "5px" }}>{elem.product.name}</h3>
            <p>₹{elem.product.price}</p>
            <div className="qty-container">
              <button
                className="qty-btn"
                onClick={() => updateQty(elem.product._id, elem.quantity + 1)}
              >
                +
              </button>

              <span className="qty-value">{elem.quantity}</span>

              <button
                className="qty-btn"
                onClick={() => {
                  if (elem.quantity > 1) {
                    updateQty(elem.product._id, elem.quantity - 1);
                  }
                }}
              >
                -
              </button>

              <button
                className="remove-btn"
                onClick={() => removeCart(elem.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
