import { HeartIcon, ShoppingCart, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/login");
  };

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
            <button className="btn">Product</button>
          </Link>
        </div>

        <div>
          <Link to="/wishlists" title="Wishlist">
            <HeartIcon style={{ cursor: "pointer" }} />
          </Link>
        </div>

        <div>
          <Link to="/cart" title="Cart">
            <button className="form-btn">
              <ShoppingCart className="h-cart" />
            </button>
          </Link>
        </div>

        {token ? (
          <div>
            <button
              className="btn"
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "#e57373",
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <>
            <div>
              <Link to="/login">
                <button
                  className="btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <LogIn size={16} /> Login
                </button>
              </Link>
            </div>
            <div>
              <Link to="/signup">
                <button
                  className="btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <UserPlus size={16} /> Sign Up
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
