import { memo } from "react";

const Banner = () => {
  return (
    <div className="ban">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/001/308/452/small/online-shopping-concept.jpg"
        alt="Banner"
      />
      <div className="banner-contant">
        <p>WELCOME TO THE E-PRODUCT</p>
        <p>Best Deals & Offers Available </p>
        </div>
        <button className="banner-btn">Shop Now </button>
      
    </div>
  );
};

export default memo(Banner);
