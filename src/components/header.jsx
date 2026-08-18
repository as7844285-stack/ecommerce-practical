import { HeartIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav">
      <div id="left">
        <div>
          <Link to="/" className="link">
            <h1>Canvasora</h1>
          </Link>
        </div>
      </div>

      <div id="right">
        <div>
          <Link to="/Product">
            {" "}
            <button className="btn"> Product</button>
          </Link>
        </div>
        <div>
          <Link to="/wishlists">
            {" "}
            <HeartIcon />
          </Link>
        </div>

        <div>
          <Link to="/cart">
            {" "}
            <button className="form-btn">
              {" "}
              <ShoppingCart className="h-cart" />{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
