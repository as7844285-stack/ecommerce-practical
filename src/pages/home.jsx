import { memo } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import { dummyImg, imgBaseURL } from "../staticData";
const Home = ({ products = [], toggleWishlist, favData }) => {
  return (
    <div>
      <Banner />

      <div className="container">
        {products.map((elem) => {
          return (
            <Card
              id={elem._id}
              title={elem.name}
              discription={elem.description || "description is not found"}
              price={elem.price}
              image={elem?.image ? `${imgBaseURL}${elem?.image}` : dummyImg}
              toggleWishlist={toggleWishlist}
              favData={favData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Home);
