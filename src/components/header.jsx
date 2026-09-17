import { useEffect, useState } from "react";
import { Heart, ShoppingBag, LogIn, LogOut, UserPlus, Palette, Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../axios";

const Header = ({ wishlistCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        setCartCount(0);
        return;
      }
      try {
        const res = await axiosInstance.get("/cart");
        const items = res?.data?.data?.products || [];
        const total = items.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="modern-nav-header">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
          <div className="brand-icon-box">
            <Palette className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">CANVASORA</span>
            <span className="brand-tag">CURATED FINE ART</span>
          </div>
        </Link>

        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "is-active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/product"
            className={`nav-link ${location.pathname === "/product" ? "is-active" : ""}`}
          >
            Artworks
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className={`nav-link admin-nav-link ${location.pathname.startsWith("/admin") ? "is-active" : ""}`}
            >
              <Shield size={15} /> Admin
            </Link>
          )}
        </nav>

        <div className="nav-actions">
          <Link to="/wishlists" className="nav-icon-btn" title="Saved Artworks">
            <Heart size={20} />
            {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-icon-btn" title="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </Link>

          {token ? (
            <div className="nav-user-box">
              <span className="nav-user-name">
                {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Collector"}
              </span>
              <button
                className="nav-auth-btn logout-btn"
                onClick={handleLogout}
                title="Log Out"
              >
                <LogOut size={16} />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="nav-auth-group">
              <Link to="/login" className="nav-auth-btn signin-btn">
                <LogIn size={15} />
                <span>Sign In</span>
              </Link>
              <Link to="/signup" className="nav-auth-btn signup-btn">
                <UserPlus size={15} />
                <span>Join</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

