import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { imgBaseURL, dummyImg } from "../staticData";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Guard: if someone lands here directly (refresh, bookmark, etc.) with no order data
  if (!order) {
    return (
      <div className="order-success-empty">
        <p>No recent order found.</p>
        <button className="place-order-btn" onClick={() => navigate("/")}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="order-success-header">
        <CheckCircle size={56} color="#2e7d32" strokeWidth={1.5} />
        <h2>Order Placed Successfully!</h2>
        <p className="order-id">Order ID: {order._id}</p>
      </div>

      <div className="order-items">
        {order.products.map((item) => (
          <div key={item.product._id || item.product} className="order-item">
            <img
              src={
                item.product?.image
                  ? `${imgBaseURL}${item.product.image}`
                  : dummyImg
              }
              alt={item.product?.name}
            />
            <div className="order-item-info">
              <p className="order-item-name">{item.product?.name}</p>
              <p className="order-item-qty">Qty: {item.quantity}</p>
            </div>
            <p className="order-item-price">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="order-total-row">
        <span>Total Paid</span>
        <span>₹{order.totalAmount}</span>
      </div>

      <div className="order-success-actions">
        <Link to="/" className="link">
          <button className="place-order-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}
