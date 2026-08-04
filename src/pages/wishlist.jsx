import { CircleX } from "lucide-react";
import { axiosInstance } from "../axios";
import { useEffect } from "react";

export default function Wishlist({ favData, setFavData, clearWishList }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axiosInstance.get("/products");
        console.log("responce", responce);
        setFavData(responce?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
        <h2>My Wishlist </h2>
        {favData.length > 0 && (
          <button className="clearBtn" onClick={clearWishList}>
            clear All <CircleX />
          </button>
        )}
      </div>
      <div className="container">
        {favData.map((elem) => {
          return (
            <WishListCard
              key={elem.id}
              id={elem.id}
              title={elem.title}
              discription={elem.description}
              price={elem.price}
              image={elem.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export const WishListCard = (prop) => {
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
    </div>
  );
};
