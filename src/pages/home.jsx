import { memo } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
const Home = ({ data, addToCart, toggleWishlist, favData }) => {
  return (
    <div>
      <Banner />

      <div className="container">
        {data.map((elem) => {
          return (
            <Card
              id={elem.id}
              title={elem.title}
              discription={elem.description}
              price={elem.price}
              image={elem.image}
              addToCart={addToCart}
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
