import { useEffect, useState } from "react";
import Card from "../components/card";
import { axiosInstance } from "../axios";
import { dummyImg, imgBaseURL } from "../staticData";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axiosInstance.get("/products");
        console.log("products", products);

        setProducts(products?.data?.data);
        console.log("products", products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <h2>All Products </h2>
      <div className="container">
        {products.map((elem) => {
          return (
            <Card
              key={elem._id}
              id={elem._id}
              title={elem.name}
              discription={elem?.description || "description not found"}
              price={elem.price}
              image={elem?.image ? `${imgBaseURL}${elem?.image}` : dummyImg}
              addToCart={elem._id}
            />
          );
        })}
      </div>
    </div>
  );
}
