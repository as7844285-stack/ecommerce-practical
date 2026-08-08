import { memo } from "react";

const Banner = () => {
  return (
    <div className="ban">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/001/308/452/small/online-shopping-concept.jpg"
        alt="Banner"
      />
      <div className="banner-contant">
        <p>WELCOME TO THE CANVASORE</p>
        <p>Your Space. Your Story. Your Art</p>
        <p>Find the perfect painting for your home, office, or collection.</p>
      </div>
      <button className="banner-btn">Buy Now </button>
    </div>
  );
};

export default memo(Banner);
