import { useEffect, useState } from "react";
import Card from "../components/card";
import { axiosInstance } from "../axios";

export default function Product({ toggleWishlist, favData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res?.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="container">
        {products.map((elem) => (
          <Card
            key={elem._id}
            product={elem}
            toggleWishlist={toggleWishlist}
            favData={favData}
          />
        ))}
      </div>
    </div>
  );
}
