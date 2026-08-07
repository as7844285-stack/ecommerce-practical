import { memo } from "react";
import Banner from "../components/banner";
import Card from "../components/card";

const Home = ({ products = [], toggleWishlist, favData, loading }) => {
  return (
    <div>
      <Banner />
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
};

export default memo(Home);
